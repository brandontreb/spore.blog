const express = require('express');
const { blogController } = require('../controllers');

const router = express.Router();

router.get('/', blogController.getBlog);

module.exports = router;