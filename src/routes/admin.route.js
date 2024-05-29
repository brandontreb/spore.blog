const express = require('express');
const validate = require('../middlewares/validate');
const { adminController } = require('../controllers');
const { adminValidation } = require('../validations');
const auth = require('../middlewares/auth.middleware');

const router = express.Router();

// Blog Settings
router
  .route('/')
  .get(auth(true), adminController.index)
  .put(auth(true), validate(adminValidation.update), adminController.update);

router.use('/account', require('./account.route'));
router.use('/pages', require('./pages.route'));
router.use('/posts', require('./posts.route'));
router.use('/menus', require('./menu.route'));

// // Posts
// router
//   .route('/posts')
//   .get(auth(true), adminController.getPosts)  
  
// router.route('/posts/new')
//   .get(auth(true), adminController.newPost)
//   // .post(auth(true), validate(adminValidation.createPost), upload.array('media_files', 4), adminController.createPost);
//   .post(auth(true),  upload.array('media_files', 4), function(req, res, next) {
//     console.log(req.body)
//     console.log(req.files)
//     next();
//   }, adminController.createPost
// );

// router
//   .route('/posts/:postId')
//   .get(auth(true), adminController.getPost)
//   .put(auth(true), validate(adminValidation.updatePost), upload.array('media_files', 4), adminController.updatePost)
//   .delete(auth(true), validate(adminValidation.deletePost), adminController.deletePost);

// // Install
router.route('/install')
  .get(auth(false), adminController.install)
  .post(validate(adminValidation.install), adminController.install);

// // Other Admin Routes
router.use('/auth', require('./auth.route'));
// router.use('/import', require('./import.route'));

module.exports = router;