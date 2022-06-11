const catchAsync = require('../utils/catchAsync');
const { blogService } = require('../services');
const MarkdownIt = require('markdown-it');
const md = new MarkdownIt();

const getBlog = catchAsync(async(req, res) => {
  let blog = await blogService.getBlog();
  res.render('pages/index', {
    ...blog.dataValues,
    homepage_content_html: md.render(blog.homepage_content)
  });
});

module.exports = {
  getBlog,
}