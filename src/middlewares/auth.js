
const auth = (required) => async(req, res, next) => {
  let session = req.session;
  console.log('auth middleware');
  if (required) {
    if (!session.user) {
      return res.redirect('/dashboard/auth/login');
    }
  }  
  next();
};

module.exports = auth;