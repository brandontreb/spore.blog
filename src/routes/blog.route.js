const express = require('express');
const { blogController, feedController } = require('../controllers');

const router = express.Router();

router.get('/', blogController.getBlog);
router.get('/blog', blogController.getPosts);
router.get('/feed.xml', feedController.xml);
router.get('/feed.json', feedController.json);

router.get('/:permalink', blogController.getPost);

module.exports = router;