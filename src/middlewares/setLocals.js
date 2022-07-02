const {blogService} = require('../services');

const setLocals = () => async(req, res, next) => {
  let blog = await blogService.getBlog();

  if(!blog) {
    if(req.originalUrl !== '/dashboard/install') {
      return res.redirect('/dashboard/install');
    }
    return next();
  }

  req.blog = blog;
  res.locals.blog = blog;
  res.locals.user = blog ? blog.user : null;

  // TODOL Save this to db
  res.locals.theme = {
    name: 'default',
    slug: 'default',
  };

  // Load the theme elements
  res.locals.theme.head = `
  <link rel="alternate" type="application/json" title="${res.locals.user.username}" href="${blog.url}/feed.json" />
  <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
  <link rel="stylesheet" href="/content/themes/${res.locals.theme.slug}/${res.locals.theme.slug}.css">
  <link href="mailto:${res.locals.user.email}" rel="me">
  `;

  next();
};

module.exports = setLocals;