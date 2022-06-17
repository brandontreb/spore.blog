
const auth = (required) => async(req, res, next) => {
  let session = req.session;
  console.log('auth middleware');
  if (required) {
    if (!session.isLoggedIn) {
      return res.redirect('/dashboard/auth/login');
    }
  }  
  res.locals.isLoggedIn = session.isLoggedIn;
  next();
};

module.exports = auth;