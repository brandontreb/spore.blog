const catchAsync = require('../utils/catchAsync');
const { blogService } = require('../services');

const getDashboard = catchAsync(async(req, res) => {
  let blog = await blogService.getBlog();
  res.render('dashboard/pages/index', {
    ...blog.dataValues
  });
});

const updateDashboard = catchAsync(async(req, res) => {
  await blogService.updateBlog(req.body);
  res.redirect('/dashboard');
});

module.exports = {
  getDashboard,
  updateDashboard
}