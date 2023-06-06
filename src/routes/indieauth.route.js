const express = require('express');
const { indieAuthController } = require('../controllers');
const auth = require('../middlewares/auth.middleware');

const router = express.Router();

router.get('/auth', auth(true), indieAuthController.auth);
router.post('/auth', auth(false), indieAuthController.token);
router.get('/approve', auth(true), indieAuthController.approve);
router.post('/token', auth(false), indieAuthController.token);
router.get('/token', indieAuthController.verifyToken);

module.exports = router;