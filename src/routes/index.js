const express = require('express');
const dashboardRoute = require('./dashboard.route');
const config = require('../config/config');

const router = express.Router();

const defaultRoutes = [{
  path: '/dashboard',
  route: dashboardRoute,
}, ];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;