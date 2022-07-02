const catchAsync = require('../../utils/catchAsync');
const MarkdownIt = require('markdown-it');
const md = new MarkdownIt();
const { blogService, userService } = require('../../services');

const install = catchAsync(async (req, res) => {  
  let blog = req.blog;
  if(blog) {
    return res.redirect('/dashboard');
  }
  
  if (Object.keys(req.body).length === 0) {
    return res.render('dashboard/pages/install', {
      dash_title: 'Install',
      blog_url: req.protocol + '://' + req.get('host')
    });
  }

  const { blog_title, blog_url, username, email, password, password_again } = req.body;

  if (password !== password_again) {
    req.flash('error', 'Passwords do not match');
    return res.render('dashboard/pages/install', {
      dash_title: 'Install',
      blog_title,
      blog_url,
      username, 
      email,      
    });    
  }

  const blogObject = {
    title: blog_title,
    url: blog_url,
    homepage_content: '# Welcome to my spore.blog\n\nChange this content in the dashboard.',
    homepage_content_html: '<h1> Welcome to my spore.blog</h1><p>Change this content in the dashboard.</p>',
    meta_description: 'A new blog for my spore.blog',
    language: 'en',
    nav: '[Home](/)\n[Archive](/archive/)',
    nav_html: '<a href="/">Home</a>\n<a href="/blog/">Blog</a>',
    favicon: '🌱'    
  }

  blog = await blogService.createBlog(blogObject);

  let userBody = {
    blog_id: blog.id,
    email: email,
    password: password,                
    username: username,    
    website: blog.url
  }

  await userService.createUser(userBody);

  req.flash('success', 'Blog installed successfully. Please log in.');
  return res.redirect('/dashboard');

});

const getDashboard = catchAsync(async(req, res) => {
  let blog = req.blog;
  res.render('dashboard/pages/index', {
    ...blog.dataValues,
    dash_title: 'Dashboard',
  });
});

const updateDashboard = catchAsync(async(req, res) => {
  let body = req.body;  
  await blogService.updateBlog(body);
  res.redirect('/dashboard');
});

const getNav = catchAsync(async(req, res) => {
  let blog = req.blog;
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
  let blog = req.blog;
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
  install,
  getDashboard,
  updateDashboard,
  getNav,
  updateNav,
  getStyles,
  updateStyles,  
}