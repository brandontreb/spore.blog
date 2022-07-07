const express = require('express');
const { conversationsController } = require('../../../controllers/api/v1');
const router = express.Router();
router.get('/', conversationsController.getConversation);
module.exports = router;