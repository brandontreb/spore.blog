const express = require('express');
const validate = require('../../middlewares/validate');
const { dashboardValidation } = require('../../validations');
const { dashboardController } = require('../../controllers/dashboard');

const router = express.Router();

router
  .route('/')
  .get(dashboardController.getDashboard)
  .put(validate(dashboardValidation.updateDashboard), dashboardController.updateDashboard);

router
  .route('/nav')
  .get(dashboardController.getNav)
  .put(validate(dashboardValidation.updateNav), dashboardController.updateNav);

router.use('/posts', require('./post.route'));

router.route('/styles')
  .get(dashboardController.getStyles)
  .put(validate(dashboardValidation.updateStyles), dashboardController.updateStyles);

router.route('/account')
  .get(dashboardController.getAccount)
  .put(validate(dashboardValidation.updateAccount), dashboardController.updateAccount);

module.exports = router;