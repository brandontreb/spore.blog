
const auth = (required) => async(req, res, next) => {
  let session = req.session;
  
  if (required) {
    if (!session.isLoggedIn) {
      // return res.redirect('/dashboard/auth/login');
    }
  }  
  req.user = {
    id: 1,
    email: 'foo@bar.com'
  }
  res.locals.isLoggedIn = session.isLoggedIn;
  next();
};

module.exports = auth;