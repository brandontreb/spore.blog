const express = require('express');
const validate = require('../../middlewares/validate');
const { postValidation } = require('../../validations');
const { postController } = require('../../controllers/dashboard');

const router = express.Router();

router.get('/', postController.getPosts);

router
  .route('/new')
  .get(postController.newPost)
  .post(validate(postValidation.createPost), postController.createPost)

router.route('/:id')
  .get(postController.getPost)
  .put(validate(postValidation.createPost), postController.updatePost)
  .delete(validate(postValidation.deletePost), postController.deletePost);

module.exports = router;