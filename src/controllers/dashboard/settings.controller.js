const catchAsync = require('../../utils/catchAsync');
const MarkdownIt = require('markdown-it');
const md = new MarkdownIt();
const { blogService } = require('../../services');

const getSettings = catchAsync(async(req, res) => {
  let blog = await blogService.getBlog();
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