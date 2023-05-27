const config = require('../config/config');
const catchAsync = require('../utils/catchAsync');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const logger = require('../config/logger');
const {hugoService, pluginService} = require('../services');

const update = catchAsync(async(req, res) => {
  let config = {
    ...req.body,
  }
  await hugoService.updateConfig(config);
  hugoService.generateSite();
  req.flash('success', 'Blog updated successfully, regenerating site...');
  res.redirect('/admin');
});

const index = catchAsync(async(req, res) => {
  const hugo = hugoService.getConfig();  
  res.render('admin/index', {
    admin_title: 'admin',
    hugo,
  });  
});

const getMenus = catchAsync(async(req, res) => {
  const hugo = hugoService.getConfig();
  let menu = hugo.menu.main.sort((a, b) => a.weight - b.weight);
  res.render('admin/menus', {
    admin_title: 'menus',
    menu
  });
});

const newMenuItem = catchAsync(async(req, res) => {  
  res.render('admin/menu_item', {
    admin_title: 'new menu item',
    menu_item: {},
  });
});

const getMenuItem = catchAsync(async(req, res) => {
  const hugo = hugoService.getConfig();  
  let url = decodeURIComponent(req.query.url);
  console.log(url);
  console.log(hugo.menu.main)
  const menu_item = hugo.menu.main.find(item => item.url === url);
  console.log(menu_item);
  res.render('admin/menu_item', {
    admin_title: 'edit menu item',
    menu_item,
  });
});

const updateMenuItem = catchAsync(async(req, res) => {
  let url = decodeURIComponent(req.query.url);
  // Update the menu item
  logger.debug('Updating menu item: %s', req.query.url);
  let menu = hugoService.getConfig().menu.main;
  menu = menu.filter(item => item.url !== url);
  menu.push(req.body);
  await hugoService.updateConfig({menu: {main: menu}});
  hugoService.generateSite();
  req.flash('success', 'Menu item updated successfully, regenerating site...');
  res.redirect('/admin/menus');
});

const createMenuItem = catchAsync(async(req, res) => {
  // Create the menu item
  let item = req.body;
  logger.debug('Creating menu item: %s', item);
  let menu = hugoService.getConfig().menu.main;
  if(!item.weight || item.weight === "") item.weight = menu.length + 1;
  menu.push(item);
  await hugoService.updateConfig({menu: {main: menu}});
  hugoService.generateSite();
  req.flash('success', 'Menu item created successfully, regenerating site...');
  res.redirect('/admin/menus');
});

const deleteMenuItem = catchAsync(async(req, res) => {
  // Delete the menu item
  logger.debug('Deleting menu item: %s', req.query.url);
  let menu = hugoService.getConfig().menu.main;
  menu = menu.filter(item => item.url !== req.query.url);
  await hugoService.updateConfig({menu: {main: menu}});
  hugoService.generateSite();
  req.flash('success', 'Menu item deleted successfully, regenerating site...');
  res.redirect('/admin/menus');
});

/*const updateBlog = catchAsync(async(req, res) => {
  let blog = res.locals.blog;
  logger.debug(`Updating blog ${blog.id} with %j`, req.body);
  await blogService.updateBlog(blog, req.body);
  req.flash('success', 'Blog updated successfully');
  res.redirect('/admin');
});

const install = catchAsync(async(req, res) => {
  let blog = res.locals.blog;
  let blogMeta = req.body;

  // Redirect if the blog is already installed
  if (blog) {
    return res.redirect('/admin');
  }

  // If this is a GET request, render the install page  
  if (req.method === 'GET' || Object.keys(blogMeta).length === 0) {
    return res.render('admin/pages/install', {
      admin_title: 'Install',
      url: req.protocol + '://' + req.get('host')
    });
  }

  // Ensure that password matches password_again
  if (blogMeta.password !== blogMeta.password_again) {
    req.flash('error', 'Passwords do not match');
    return res.render('admin/pages/install', {
      admin_title: 'Install',
      title: blogMeta.title,
      url: blogMeta.url,
      username: blogMeta.username,
      email: blogMeta.email,
    });
  }

  // Create the blog and redirect to the admin page
  await blogService.createBlog(blogMeta);
  req.flash('success', 'Blog installed successfully. Please log in.');
  return res.redirect('/admin');

});

const getPosts = catchAsync(async(req, res) => {
  let blog = res.locals.blog;
  let type = req.query.type || 'note';
  let posts = await postService.queryPosts({
    blog_id: blog.id,
    type: type
  }, {
    order: [
      ['published_date', 'DESC']
    ],
    limit: res.locals.postsPerPage,
    offset: (res.locals.page - 1) * res.locals.postsPerPage
  });
  res.render('admin/pages/posts', {
    admin_title: 'Posts',
    posts: posts,
    type: type,
    page: res.locals.page,
    postsPerPage: res.locals.postsPerPage,
  });
});

const getPost = catchAsync(async(req, res) => {
  let blog = res.locals.blog;
  let post = await postService.getPostById(req.params.postId);

  // Ensure that the post exists
  if (!post) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Post not found');
  }

  // Ensure that the post belongs to the blog
  if (post.blog_id !== blog.id) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Post not found');
  }

  res.render('admin/pages/post', {
    admin_title: 'Post',
    post: post,
    type: post.type,
  });
});

const updatePost = catchAsync(async(req, res) => {  
  let blog = res.locals.blog;
  let type = req.body.title && req.body.title.length > 0 ? 'article' : 'note';
  let post = await postService.getPostById(req.params.postId);

  // Ensure that the post exists
  if (!post) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Post not found');
  }

  // Ensure that the post belongs to the blog
  if (post.blog_id !== blog.id) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Post not found');
  }  

  let postDoc = {
    ...req.body,
    type: type,
    blog_id: blog.id,
    id: post.id
  }

  if(req.body.slug && req.body.slug.length > 0 && req.body.slug !== post.slug) {
    let slug = req.body.slug;
    let now = new Date();
    const date = now.toISOString().split('T')[0].replaceAll('-', '/');
    postDoc.permalink = `/${date}/${slug}`;
  }

  logger.debug("Updating post: " + JSON.stringify(postDoc));
  await postService.createPost(postDoc);
  post = await postService.getPostById(post.id);

  // Handle media
  for (let file of req.files) {
    let mediaBody = {
      type: 'image', // TODO: Hardcoded for now, update when more media supported
      original_filename: file.originalname,
      path: file.path,
      mime_type: file.mimetype,
      filename: file.filename,
      size: file.size,
      post_id: post.id,
    };

    await mediaService.createMedia(mediaBody);
  }
  
  let url = `${blog.url}${post.permalink}`;
  await indieWebService.sendWebmentions(url, post.links);

  req.flash('success', 'Post updated successfully');
  res.redirect('/admin/posts/' + post.id);
});

const newPost = catchAsync(async(req, res) => {  
  res.render('admin/pages/post', {
    ...res.locals,
    admin_title: 'Post',    
    type: req.query.type || 'note',
  });
});

const createPost = catchAsync(async(req, res) => {  
  let blog = res.locals.blog;  

  let slug = req.body.slug || Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  let now = new Date();
  const date = now.toISOString().split('T')[0].replaceAll('-', '/');
  let permalink = `/${date}/${slug}`;

  let postDoc = {
    ...req.body,    
    blog_id: blog.id,
    user_id: blog.user.id,
    slug,
    permalink
  }

  logger.debug("Creating post: " + JSON.stringify(postDoc));
  let post = await postService.createPost(postDoc);

  // Handle media
  for (let file of req.files) {
    let mediaBody = {
      type: 'image', // TODO: Hardcoded for now, update when more media supported
      original_filename: file.originalname,
      path: file.path,
      mime_type: file.mimetype,
      filename: file.filename,
      size: file.size,
      post_id: post.id,
    };

    await mediaService.createMedia(mediaBody);
  }

  let url = `${blog.url}${post.permalink}`;
  await indieWebService.sendWebmentions(url, post.links);

  req.flash('success', 'Post created successfully');
  res.redirect('/admin/posts/' + post.id);
});

const deletePost = catchAsync(async(req, res) => {
  let blog = res.locals.blog;
  let post = await postService.getPostById(req.params.postId);
  
  // Ensure that the post exists
  if (!post) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Post not found');
  }

  // Ensure that the post belongs to the blog
  if (post.blog_id !== blog.id) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Post not found');
  }

  await postService.deletePost(post.id);
  req.flash('success', 'Post deleted successfully');
  res.redirect('/admin/posts');
});

module.exports = {
  getAdmin,
  install,
  updateBlog,
  getPosts,
  getPost,
  newPost,
  createPost,
  updatePost,
  deletePost
};*/


module.exports = {
  update,
  index,
  getMenus,
  newMenuItem,
  getMenuItem,
  updateMenuItem,
  createMenuItem,
  deleteMenuItem,
};