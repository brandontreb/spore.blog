const express = require('express');
const { accountController } = require('../controllers');
const auth = require('../middlewares/auth.middleware');
const upload = require('../middlewares/upload.middleware');

const router = express.Router();

// Account Settings
router
  .route('/')
  .get(auth(true), accountController.index)
  .put(auth(true), accountController.update);
// Account photo
  router.route('/photo')
  .get(auth(true), accountController.getPhoto)
  .post(auth(true), upload(`data/hugo/static/`, 'avatar').single('avatar'), accountController.updatePhoto)
  // .delete(auth(true), accountController.deletePhoto);

module.exports = router;