const express = require('express');
const { pagesController } = require('../controllers');
const auth = require('../middlewares/auth.middleware');

const router = express.Router();

// Account Settings
router
  .route('/')
  .get(auth(true), pagesController.getPages);

router.route('/new')
  .get(auth(true), pagesController.newPage)
  .post(auth(true), pagesController.createPage);

router.route('/redirects/new')
  .get(auth(true), pagesController.newRedirect)
  .post(auth(true), pagesController.createRedirect);

router.route('/redirects/:slug')
  .get(auth(true), pagesController.getRedirect)

router
  .route('/:slug')
  .get(auth(true), pagesController.getPage)
  .put(auth(true), pagesController.updatePage)
  .delete(auth(true), pagesController.deletePage)

module.exports = router;