const express = require('express');
const validate = require('../middlewares/validate');
const { authValidation } = require('../validations');
const { authController } = require('../controllers');
const auth = require('../middlewares/auth.middleware');

const router = express.Router();

router.route('/login')
  .get(auth(false), authController.getLogin)
  .post(validate(authValidation.login), authController.loginWithEmailAndPassword);

router.route('/resetLogin')
  .get(auth(false), authController.resetLogin)
  .post(validate(authValidation.login), authController.resetLogin);

router.get('/logout', authController.logout);

module.exports = router;