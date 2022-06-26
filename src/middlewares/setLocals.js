const {blogService} = require('../services');

const setLocals = () => async(req, res, next) => {
  let blog = await blogService.getBlog();

  if(!blog && req.originalUrl !== '/dashboard/install') {
    return res.redirect('/dashboard/install');
  }

  req.blog = blog;
  res.locals.blog = blog;
  next();
};

module.exports = setLocals;