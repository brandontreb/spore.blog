const express = require('express');
const validate = require('../middlewares/validate');
const dashboardValidation = require('../validations/dashboard.validation');
const { dashboardController } = require('../controllers');

const router = express.Router();

router
  .route('/')
  .get(dashboardController.getDashboard)
  .put(dashboardController.updateDashboard);

module.exports = router;