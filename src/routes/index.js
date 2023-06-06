const express = require('express');
const micropubRoute = require('./micropub.route');
const adminRoute = require('./admin.route');
const indieAuthRoute = require('./indieauth.route');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/micropub',
    route: micropubRoute,
  },
  {
    path: '/admin',
    route: adminRoute,
  },  
  {
      path: '/indieauth',
      route: indieAuthRoute,
  }
];


defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
