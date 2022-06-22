const express = require('express');
const dashboardRoute = require('./dashboard/dashboard.route');
const blogRoute = require('./blog.route');
const setLocals = require('../middlewares/setLocals');

const router = express.Router();

const defaultRoutes = [{
    path: '/dashboard',
    route: dashboardRoute,
  }, {
    path: '/',
    route: blogRoute,
  },  
];

defaultRoutes.forEach((route) => {
  router.use(route.path, setLocals(), route.route);
});

module.exports = router;