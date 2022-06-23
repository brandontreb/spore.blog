const express = require('express');
const validate = require('../../middlewares/validate');
const { postValidation } = require('../../validations');
const { postController } = require('../../controllers/dashboard');
const upload = require('../../middlewares/upload');

const router = express.Router();

router.get('/', postController.getPosts);

router
  .route('/new')
  .get(postController.newPost)
  .post(validate(postValidation.createPost), upload.array('media_files', 4), postController.createPost)

router.route('/:id')
  .get(postController.getPost)
  .put(validate(postValidation.createPost), upload.array('media_files', 4), postController.updatePost)
  .delete(validate(postValidation.deletePost), postController.deletePost);

module.exports = router;