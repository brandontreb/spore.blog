const express = require('express');
const webmentionRoute = require('./webmention.route');

const router = express.Router();

const defaultRoutes = [{
    path: '/webmention',
    route: webmentionRoute,
  }  
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;