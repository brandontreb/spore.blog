const express = require('express');
const { blogController, feedController } = require('../controllers');

const router = express.Router();

router.get('/', blogController.getIndex);
router.get('/archive', blogController.getArchive);
router.get('/feed.xml', feedController.xml);
router.get('/feed.json', feedController.json);

router.get('/:slug',blogController.getPost);
router.get('/:year?/:month?/:day?/:slug',blogController.getPost);

module.exports = router;