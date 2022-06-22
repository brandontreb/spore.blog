const express = require('express');
const multer  = require('multer')
let upload = multer({
    storage: multer.diskStorage({
       destination: (req, file, cb) => {
          cb(null, 'content/uploads')
     },
     filename: (req, file, cb) => {        
            let fileExtension = file.originalname.split('.')[1] // get file extension from original file name
            cb(null, `avatar.${fileExtension}`)
         }
      })
})

const validate = require('../../middlewares/validate');
const { accountValidation } = require('../../validations');
const { accountController } = require('../../controllers/dashboard');
const auth = require('../../middlewares/auth');

const router = express.Router();

router.route('/')
  .get(auth(true),accountController.getAccount)
  .put(auth(true),validate(accountValidation.updateAccount), accountController.updateAccount);

router.route('/photo')
  .get(auth(true),accountController.getPhoto)
  .post(auth(true),validate(accountValidation.updatePhoto), upload.single('profile_photo'), accountController.updatePhoto)
  .delete(auth(true),accountController.deletePhoto);

module.exports = router;