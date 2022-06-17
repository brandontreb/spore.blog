const catchAsync = require('../../utils/catchAsync');
const MarkdownIt = require('markdown-it');
const md = new MarkdownIt();
const { blogService } = require('../../services');

const getLogin = catchAsync(async(req, res) => {
  let blog = await blogService.getBlog();
  res.render('dashboard/pages/login', {
    blog,
    dash_title: 'Login',
  });
});

module.exports = {
  getLogin,
}