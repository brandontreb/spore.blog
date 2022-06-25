const catchAsync = require('../../utils/catchAsync');
const { postService } = require('../../services');

const getPosts = catchAsync(async(req, res) => {
  let posts = await postService.queryPosts({}, {
    order: [
      ['published_date', 'DESC']
    ]
  });

  res.render('dashboard/pages/posts', {
    posts,
    dash_title: 'Posts'
  });
});

const getPost = catchAsync(async(req, res) => {
  let post = await postService.getPostById(req.params.id);
  console.log(post)

  res.render('dashboard/pages/post', {
    post,
    dash_title: 'Edit Post'
  });
});

const newPost = catchAsync(async(req, res) => {
  res.render('dashboard/pages/post', {
    dash_title: 'New Post'
  });
})

const createPost = catchAsync(async(req, res) => {  
  let blog = req.blog;
  let user = req.user;
  let body = req.body;
  let media_files = req.files;  
  body.blog_id = blog.id;
  body.user_id = user.id;  
  body.media = media_files || [];

  let post = await postService.createPost(body);
  req.flash('success', `Post created!`);
  res.redirect(`/dashboard/posts/${post.id}`);
});

const updatePost = catchAsync(async(req, res) => {  
  let body = req.body;
  let media_files = req.files;  
  body.media = media_files || [];
  
  let post = await postService.updatePost(req.params.id, body);
  req.flash('success', `Post updated!`);
  res.redirect(`/dashboard/posts/${post.id}`);
});

const deletePost = catchAsync(async(req, res) => {
  await postService.deletePost(req.params.id);
  req.flash('success', `Post deleted!`);
  res.redirect('/dashboard/posts');
});

module.exports = {
  getPost,
  getPosts,
  newPost,
  createPost,
  updatePost,
  deletePost
}