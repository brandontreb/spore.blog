const config = require('../config/config');
const logger = require('../config/logger');
// const { blogService } = require('../services');

const auth = (required) => async(req, res, next) => {
  
  // let blog = await blogService.getBlog(blogId);  

  // if (!blog) {
  //   if (req.originalUrl !== '/admin/install') {
  //     return res.redirect('/admin/install');
  //   }
  //   return next();
  // }

  if (required && !config.dev) {
    // Check if the user is logged in
    let session = req.session;
    if (!session.isLoggedIn) {
      // If the user is not logged in, redirect to the login page
      let currentPath = req.originalUrl;
      currentPath = encodeURIComponent(currentPath);
      return res.redirect(`/admin/auth/login?redirect=${currentPath}`);
    }
  }
  next();
};

module.exports = auth;