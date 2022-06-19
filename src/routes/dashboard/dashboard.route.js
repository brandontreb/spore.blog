const express = require('express');
const validate = require('../../middlewares/validate');
const { dashboardValidation } = require('../../validations');
const { dashboardController } = require('../../controllers/dashboard');
const auth = require('../../middlewares/auth');

const router = express.Router();

router
  .route('/')
  .get(auth(true),dashboardController.getDashboard)
  .put(auth(true),validate(dashboardValidation.updateDashboard), dashboardController.updateDashboard);

router
  .route('/nav')
  .get(auth(true),dashboardController.getNav)
  .put(auth(true),validate(dashboardValidation.updateNav), dashboardController.updateNav);

router.route('/styles')
  .get(auth(true),dashboardController.getStyles)
  .put(auth(true),validate(dashboardValidation.updateStyles), dashboardController.updateStyles);

router.use('/posts',auth(true), require('./post.route'));
router.use('/settings', require('./settings.route'));  
router.use('/account', require('./account.route'));
router.use('/auth', require('./auth.route'));

module.exports = router;