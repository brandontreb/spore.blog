var fs = require('fs');
const multer = require('multer')
const utils = require('../utils/utils');

let upload = (directory, filename = null) => multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {            
      // If the directory doesn't exist, create it
      if(!fs.existsSync(directory)) {
        fs.mkdirSync(directory, { recursive: true });
      }
      cb(null,directory)
    },
    filename: (req, file, cb) => {
      let fileExtension = file.originalname.split('.') // get file extension from original file name                  
      fileExtension = fileExtension[fileExtension.length - 1] // get file extension from original file name 
      if(filename) {
        cb(null, filename + '.' + fileExtension)
        return;
      }
      let name = utils.randomStringOfLength(16);
      cb(null, Date.now() + '.' + name + '.' + fileExtension)
    }
  }),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg" ||
      file.mimetype == "image/gif") {
      cb(null, true);
    } else {
      cb(null, false);
      const err = new Error('Only .png, .jpg and .jpeg formats allowed!')
      err.name = 'ExtensionError'
      return cb(err);
    }
  }
})

module.exports = upload;