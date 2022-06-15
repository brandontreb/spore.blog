const catchAsync = require('../../utils/catchAsync');
const MarkdownIt = require('markdown-it');
const md = new MarkdownIt();
const { blogService } = require('../../services');

const getDashboard = catchAsync(async(req, res) => {
  let blog = await blogService.getBlog();
  res.render('dashboard/pages/index', {
    ...blog.dataValues,
    dash_title: 'Dashboard',
  });
});

const updateDashboard = catchAsync(async(req, res) => {
  let body = req.body;
  let homepage_content_html = md.render(body.homepage_content);
  await blogService.updateBlog(body);
  res.redirect('/dashboard');
});

const getNav = catchAsync(async(req, res) => {
  let blog = await blogService.getBlog();
  res.render('dashboard/pages/nav', {
    ...blog.dataValues,
    dash_title: 'Nav',
  });
});

const updateNav = catchAsync(async(req, res) => {
  let body = req.body;
  body.nav_html = md.render(body.nav);
  await blogService.updateBlog(req.body);
  res.redirect('/dashboard/nav');
});

const getStyles = catchAsync(async(req, res) => {
  let blog = await blogService.getBlog();
  res.render('dashboard/pages/styles', {
    blog,
    dash_title: 'Styles',
  });
});

const updateStyles = catchAsync(async(req, res) => {
  let body = req.body;
  await blogService.updateBlog(body);
  res.redirect('/dashboard/styles');
});

module.exports = {
  getDashboard,
  updateDashboard,
  getNav,
  updateNav,
  getStyles,
  updateStyles
}