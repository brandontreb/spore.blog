const express = require('express');
const { micropubController } = require('../controllers');
const indieauth = require('../middlewares/indieauth.middleware');
const upload = require('../middlewares/upload.middleware');

const router = express.Router();

router.route('/')
  .post(indieauth('create'), micropubController.create)
  .get(indieauth('create'), micropubController.create);

router.route('/media')
  .post(indieauth('create'), upload(`data/hugo/static/uploads/${new Date().getFullYear()}`).fields(['file', 'video', 'photo', 'audio', 'video[]', 'photo[]', 'audio[]'].map(type => ({ name: type }))), micropubController.media)
  // .get(auth(false), micropubController.getMedia);

module.exports = router;