
const auth = (required) => async(req, res, next) => {
  let session = req.session;
  
  if (required) {
    if (!session.isLoggedIn) {
      return res.redirect('/dashboard/auth/login');
    }
  }  
  
  let {userService} = require('../services');
  let user = await userService.getUser(req.session.user.id);
  req.user = user;  
  next();
};

module.exports = auth;