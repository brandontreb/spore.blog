const catchAsync = require('../../utils/catchAsync');
const { postService } = require('../../services');

const getPosts = catchAsync(async(req, res) => {
  let posts = await postService.queryPosts({}, {
    order: [
      ['createdAt', 'DESC']
    ]
  });

  res.render('dashboard/pages/posts', {
    posts,
    dash_title: 'Posts'
  });
});

const newPost = catchAsync(async(req, res) => {
  res.render('dashboard/pages/post', {
    dash_title: 'New Post'
  });
})

const createPost = catchAsync(async(req, res) => {
  let body = req.body;
  let post = await postService.createPost(req.body);
  res.redirect('/dashboard/posts');
});

module.exports = {
  getPosts,
  newPost,
  createPost
}