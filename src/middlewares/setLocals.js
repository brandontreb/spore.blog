const {blogService} = require('../services');

const setLocals = () => async(req, res, next) => {
  let blog = await blogService.getBlog();
  req.blog = blog;
  res.locals.blog = blog;
  next();
};

module.exports = setLocals;