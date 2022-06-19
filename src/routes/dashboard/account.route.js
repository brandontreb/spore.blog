const express = require('express');
const validate = require('../../middlewares/validate');
const { accountValidation } = require('../../validations');
const { accountController } = require('../../controllers/dashboard');
const auth = require('../../middlewares/auth');

const router = express.Router();

router.route('/')
  .get(auth(true),accountController.getAccount)
  .put(auth(true),validate(accountValidation.updateAccount), accountController.updateAccount);

router.route('/photo')
  .get(auth(true),accountController.getPhoto)

module.exports = router;