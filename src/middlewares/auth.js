
const auth = (required) => async(req, res, next) => {
  let session = req.session;
  
  if (required) {
    if (!session.isLoggedIn) {
      // return res.redirect('/dashboard/auth/login');
    }
  }  
  
  let {userService} = require('../services');
  let user = await userService.getUser(1);
  req.user = user;
  res.locals.isLoggedIn = session.isLoggedIn;
  next();
};

module.exports = auth;