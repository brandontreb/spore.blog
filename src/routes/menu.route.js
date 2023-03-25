const express = require('express');
const { adminController } = require('../controllers');
const auth = require('../middlewares/auth.middleware');

const router = express.Router();

// Navigation Settings
router
  .route('/')
  .get(auth(true), adminController.getMenus)  

router
  .route('/new_item')
  .get(auth(true), adminController.newMenuItem)

router
  .route('/item')
  .get(auth(true), adminController.getMenuItem)
  .put(auth(true), adminController.updateMenuItem)
  .post(auth(true), adminController.createMenuItem)
  .delete(auth(true), adminController.deleteMenuItem)

module.exports = router;