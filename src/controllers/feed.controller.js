const catchAsync = require('../utils/catchAsync');
const { blogService, postService } = require('../services');

const rss = catchAsync(async(req, res) => {
  const blog = await blogService.getBlog();
  const posts = await postService.queryPosts({
    published: true,
    is_page: false
  }, {
    order: [
      ['published_date', 'DESC'],
    ],
    limit: 10,
  });

  res.set('Content-Type', 'application/rss+xml');
  res.render('feeds/rss', {
    blog,
    posts,
  });

});

module.exports = {
  rss,
}