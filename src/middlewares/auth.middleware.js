const config = require('../config/config');
const logger = require('../config/logger');

const auth = (required) => async(req, res, next) => {    
  let session = req.session;
  let hugo = config.hugo.config;
  let user = config.user;
  let isLoggedIn = session.isLoggedIn;

  res.locals.hugo = hugo && Object.keys(hugo).length ? hugo : null;  
  res.locals.user = user;
  res.locals.isLoggedIn = isLoggedIn

  if (required && !config.dev) {    
    console.log('auth middleware');
    if (!isLoggedIn) {
      // If the user is not logged in, redirect to the login page
      let currentPath = req.originalUrl;
      currentPath = encodeURIComponent(currentPath);
      return res.redirect(`/admin/auth/login?redirect=${currentPath}`);
    }
  }
  next();
};

module.exports = auth;