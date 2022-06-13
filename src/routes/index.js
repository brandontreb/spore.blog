const express = require('express');
const dashboardRoute = require('./dashboard/dashboard.route');
const blogRoute = require('./blog.route');
const feedRoute = require('./feed.route');

const router = express.Router();

const defaultRoutes = [{
    path: '/dashboard',
    route: dashboardRoute,
  }, {
    path: '/',
    route: blogRoute,
  },
  {
    path: '/feeds',
    route: feedRoute,
  }
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;