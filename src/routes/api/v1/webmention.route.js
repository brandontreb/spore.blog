const express = require('express');
const { webmentionController } = require('../../../controllers/api/v1');
const router = express.Router();
router.get('/', webmentionController.webmentionRecieved);
router.post('/', webmentionController.webmentionRecieved);
module.exports = router;