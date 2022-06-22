const catchAsync = require('../../utils/catchAsync');
const { blogService } = require('../../services');

const getSettings = catchAsync(async(req, res) => {
  let blog = req.blog;
  res.render('dashboard/pages/settings', {
    blog,
    dash_title: 'Blog Settings',
  });
});

const updateSettings = catchAsync(async(req, res) => {
  let body = req.body;  
  await blogService.updateBlog(body);
  res.redirect('/dashboard/settings');
});

module.exports = {
  getSettings,
  updateSettings,
}