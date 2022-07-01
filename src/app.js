const express = require('express');
const helmet = require('helmet');
const xss = require('xss-clean');
const compression = require('compression');
const cors = require('cors');
const httpStatus = require('http-status');
const methodOverride = require('method-override')
const config = require('./config/config');
const morgan = require('./config/morgan');
const { authLimiter } = require('./middlewares/rateLimiter');
const routes = require('./routes');
const { errorConverter, errorHandler } = require('./middlewares/error');
const ApiError = require('./utils/ApiError');
const session = require('express-session');

const app = express();

if (config.env !== 'test') {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

// set security HTTP headers
// app.use(helmet.contentSecurityPolicy({
//   directives: {
//     defaultSrc: ["'self'"],
//     scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
//   },
// }));

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// Allows PUT and DELETE method in forms
// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))

// sanitize request data
app.use(xss());

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options('*', cors());

// Session configuration
// TODO: Move to config file
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    // 30 days
    maxAge: 60 * 60 * 24 * 30 * 1000,
    httpOnly: config.env === 'production',
    secure: config.env === 'production',
    // sameSite: 'strict',
  },
}));

// Add flash messages
app.use(require('flash')());
// Clear flash on each request
app.get('/*', function(req,res,next) {
  req.session.flash = [];
  next();
});

// limit repeated failed requests to auth endpoints
if (config.env === 'production') {
  app.use('/v1/auth', authLimiter);
}

// View engine setup
app.use('/content/uploads', express.static('content/uploads'));
app.use(express.static('src/public'));
app.set('view engine', 'ejs');
app.set('views', 'src/views');

app.get('/content/themes/:name/:name.css', (req, res) => {  
  res.sendFile(`/content/themes/${req.params.name}/${req.params.name}.css`, {root: './'});  
});

// view routes
app.use(routes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  console.log(req.url);
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

module.exports = app;