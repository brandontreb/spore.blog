const express = require('express');
const dashboardRoute = require('./dashboard/dashboard.route');
const blogRoute = require('./blog.route');
const apiRoutes = require('./api/v1/index');
const setLocals = require('../middlewares/setLocals');

const router = express.Router();

const defaultRoutes = [{
    path: '/dashboard',
    route: dashboardRoute,
  }, {
    path: '/api/v1',
    route: apiRoutes,
  },{
    path: '/',
    route: blogRoute,
  },  
];

defaultRoutes.forEach((route) => {
  router.use(route.path, setLocals(), route.route);
});

module.exports = router;