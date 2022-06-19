const express = require('express');
const validate = require('../../middlewares/validate');
const { settingsValidation } = require('../../validations');
const { settingsController } = require('../../controllers/dashboard');
const auth = require('../../middlewares/auth');

const router = express.Router();

router.route('/')
  .get(auth(true), settingsController.getSettings)
  .put(auth(true), validate(settingsValidation.updateSettings), settingsController.updateSettings);

module.exports = router;