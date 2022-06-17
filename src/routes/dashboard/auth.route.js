const express = require('express');
const validate = require('../../middlewares/validate');
const { authValidation } = require('../../validations');
const { authController } = require('../../controllers/dashboard');

const router = express.Router();

router.route('/login')
  .get(authController.getLogin)
  .post(validate(authValidation.login), authController.loginWithEmailAndPassword);

router.get('/logout', authController.logout);

module.exports = router;