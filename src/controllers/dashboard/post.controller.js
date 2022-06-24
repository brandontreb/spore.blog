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
  body.blog_id = blog.id;
  body.user_id = user.id;
  
  let media_files = req.files;  
  
  // Add an img src to the body 
  if (media_files) {
    body.media = media_files;
    media_files.forEach(file => {
      // console.log(file);
      body.content = `${body.content}\n\n![${file.originalname}](${blog.url}/${file.path})`;
    });
  }

  let post = await postService.createPost(body);
  req.flash('success', `Post created!`);
  res.redirect(`/dashboard/posts/${post.id}`);
});

const updatePost = catchAsync(async(req, res) => {
  let blog = req.blog;
  let body = req.body;
  let media_files = req.files;  
  
  // Add an img src to the body 
  if (media_files) {
    body.media = media_files.map(file => file.filename);
    media_files.forEach(file => {      
      body.content = `${body.content}\n\n![${file.originalname}](${blog.url}/${file.path})`;
    });
  }
  
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