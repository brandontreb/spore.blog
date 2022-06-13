const express = require('express');
const router = express.Router();
const { feedController } = require('../controllers');

router.get('/rss.xml', feedController.rss);

module.exports = router;