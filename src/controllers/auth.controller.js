const catchAsync = require('../utils/catchAsync');
const config = require('../config/config');
const { authService } = require('../services');
const logger = require('../config/logger');

const getLogin = catchAsync(async(req, res) => {
  if (req.query.redirect) {
    req.session.redirect = req.query.redirect;
  }

  res.render('admin/login', {
    admin_title: 'Login',
  });
});

const loginWithEmailAndPassword = catchAsync(async(req, res, next) => {
  const { email, password } = req.body;
  const authenticated = await authService.loginWithEmailAndPassword(email, password);

  logger.debug('Authenticated: %j', authenticated);  
  if (authenticated || config.dev) {
    req.session.isLoggedIn = true;    
    req.session.save(err => {
      if (err) {
        logger.error(err);
        return next(err);
      }

      logger.debug('Initialized session %j', req.session);

      if (req.session.redirect) {
        let redirect = req.session.redirect;
        redirect = decodeURIComponent(redirect);
        delete req.session.redirect;
        return res.redirect(redirect);
      }      

      return res.redirect('/admin');
    });
  } else {
    res.flash('error', 'Invalid email or password');
    return res.redirect('/admin/auth/login');
  }
});

const logout = catchAsync(async(req, res, next) => {
  logger.debug('Logging out');
  req.session.destroy(err => {
    if (err) {
      console.error(err);
      return next(err);
    }
    return res.redirect('/');
  });
});

module.exports = {
  getLogin,
  loginWithEmailAndPassword,
  logout,
}