const catchAsync = require('../utils/catchAsync');
const { blogService, postService } = require('../services');
const MarkdownIt = require('markdown-it');
const md = new MarkdownIt();

const getBlog = catchAsync(async(req, res) => {
  let blog = await blogService.getBlog();
  blog.url = req.protocol + '://' + req.get('host') + req.originalUrl
  res.render('pages/index', {
    title: blog.title,
    blog,
  });
});

const getPosts = catchAsync(async(req, res) => {
  let q = req.query.q || '';
  let blog = await blogService.getBlog();
  let posts = await postService.queryPosts(q, {
    order: [
      ['published_date', 'DESC']
    ]
  });
  res.render('pages/blog', {
    title: `Posts | ${blog.title}`,
    posts,
    blog
  });
});

const getPost = catchAsync(async(req, res) => {
  let blog = await blogService.getBlog();
  let post = await postService.getPostByPermalink(req.params.permalink);
  blog.url = req.protocol + '://' + req.get('host') + req.originalUrl

  // TODO: Refactor into post model
  post.content_html = md.render(post.content);
  post.tags = post.tags.split(',');

  res.render('pages/post', {
    blog,
    post,
    title: post.title,
  });
});

module.exports = {
  getBlog,
  getPost,
  getPosts
}