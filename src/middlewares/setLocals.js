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

  const fullUrl = encodeURIComponent(req.protocol + '://' + req.get('host') + req.originalUrl);

  // Load the theme elements
  res.locals.theme.head = `
  <link rel="authorization_endpoint" href="${blog.url}/dashboard/auth/login">
  <link rel="token_endpoint" href="${blog.url}/api/v1/micropub/token">
  <link rel="micropub" href="${blog.url}/api/v1/micropub">
  <link rel="alternate" type="application/json" title="${res.locals.user.username}" href="${blog.url}/feed.json" />
  <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
  <link rel="stylesheet" href="/content/themes/${res.locals.theme.slug}/${res.locals.theme.slug}.css">
  <link rel="me" href="mailto:${res.locals.user.email}">
  <link rel="webmention" href="${blog.url}/api/v1/webmention">
  <script src="/scripts/conversation.js?url=${fullUrl}" async defer></script>
  `;

  next();
};

module.exports = setLocals;