const express = require('express');
const { postsController } = require('../controllers');
const auth = require('../middlewares/auth.middleware');

const router = express.Router();

// Account Settings
router
  .route('/')
  .get(auth(true), postsController.getPosts);

router.route('/new')
  .get(auth(true), postsController.newPost)
  .post(auth(true), postsController.createPost);

// router.route('/redirects/new')
//   .get(auth(true), pagesController.newRedirect)
//   .post(auth(true), pagesController.createRedirect);

// router.route('/redirects/:slug')
//   .get(auth(true), pagesController.getRedirect)

// router
//   .route('/:slug')
//   .get(auth(true), pagesController.getPage)
//   .put(auth(true), pagesController.updatePage)
//   .delete(auth(true), pagesController.deletePage)

module.exports = router;