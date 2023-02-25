var bcrypt = require('bcrypt');

const encrypt = function(password, callback) {
   bcrypt.genSalt(10, function(err, salt) {
    if (err) 
      return callback(err);

    bcrypt.hash(password, salt, function(err, hash) {
      return callback(err, hash);
    });
  });
};

const compare = function(plainPass, hashword, callback) {
  bcrypt.compare(plainPass, hashword, function(err, isPasswordMatch) {   
      return err == null ?
          callback(null, isPasswordMatch) :
          callback(err);
  });
};

// Get the password from the command line arguments
var password = process.argv[2];
// Hash the password if called from command line
if(password) {
  encrypt(password, function(err, hash) {
    if (err) throw err;
    console.log(hash);
  });
}

module.exports = {
  encrypt,
  compare
};