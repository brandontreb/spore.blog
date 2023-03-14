const express = require('express');
const { accountController } = require('../controllers');
const auth = require('../middlewares/auth.middleware');

const router = express.Router();

// Blog Settings
router
  .route('/')
  .get(auth(true), accountController.read)
  .put(auth(true), accountController.update);

module.exports = router;