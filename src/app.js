const express = require('express');
const helmet = require('helmet');
const xss = require('xss-clean');
const compression = require('compression');
const cors = require('cors');
const httpStatus = require('http-status');
const session = require('express-session');
const morgan = require('./config/morgan');
const { authLimiter } = require('./middlewares/rateLimiter');
const routes = require('./routes');
const { errorConverter, errorHandler } = require('./middlewares/error');
const ApiError = require('./utils/ApiError');
const methodOverride = require('method-override');
const {systemService, hugoService} = require('./services');

const app = express();

app.use(morgan.successHandler);
app.use(morgan.errorHandler);

// set security HTTP headers
app.use(helmet({
  contentSecurityPolicy: false,
}));

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options('*', cors());

// Allows PUT and DELETE method in forms
// override with POST having ?_method=DELETE
app.use(methodOverride('_method'));

app.use('*', async (req, res, next) => {  
  if(!systemService.isInstalled() && 
    !req.originalUrl.includes('admin/install') &&
      !req.originalUrl.includes('.css') && 
      !req.originalUrl.includes('.js')) {   
    return res.redirect('/admin/install');
  }  
  next();
});

// Session configuration
app.set('trust proxy', 1);
const config = require('./config/config');
app.use(session({
  key: 'spore.blog.session',
  secret: config.jwt.secret,
  resave: false,
  saveUninitialized: true,
  cookie: {
    // 30 days
    maxAge: 60 * 60 * 24 * 30 * 1000,
    httpOnly: true,
    secure: false,//config.env === 'production',
    sameSite: 'lax',
  },
}));

// Add flash messages
app.use(require('flash')());
// Clear flash on each request
app.get('/*', function(req, res, next) {
  req.session.flash = [];
  next();
});

app.set('view engine', 'ejs');
app.set('views', 'src/views');

// limit repeated failed requests to auth endpoints
if (config.env === 'production') {
  app.use('/v1/auth', authLimiter);
}

app.use(async (req, res, next) => {
  // log request
  console.log(`[${req.method}] ${req.originalUrl}`);
  // log all params
  console.log(req.params);
  console.log(req.query);
  console.log(req.body);
  next();
});

// v1 api routes
app.use('/', routes);

app.use(express.static('data/hugo/public'));
app.use(express.static('src/views/static'));

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  // next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
  res.redirect('/404.html');
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

module.exports = app;
