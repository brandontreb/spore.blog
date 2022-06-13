const express = require('express');
const { blogController } = require('../controllers');

const router = express.Router();

router.get('/', blogController.getBlog);
router.get('/blog', blogController.getPosts);
router.get('/:permalink', blogController.getPost);

module.exports = router;