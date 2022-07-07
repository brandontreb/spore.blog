const express = require('express');
const webmentionRoute = require('./webmention.route');
const conversationsRoute = require('./conversations.route');

const router = express.Router();

const defaultRoutes = [{
    path: '/webmention',
    route: webmentionRoute,
  } , {
    path: '/conversations',
    route: conversationsRoute,
  }
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;