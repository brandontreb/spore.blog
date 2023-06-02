const bcrypt = require("bcrypt");
const fs = require('fs');

const loginWithEmailAndPassword = async(email, plaintextPassword) => {  
  // Get the contents of the file data/user.json using fs
  const user = JSON.parse(fs.readFileSync('data/user.json', 'utf8'));
  // compare lowercase email with lowercase user.email
  if (email.toLowerCase() !== user.email.toLowerCase()) {
    return false;
  }
  // Get the hash from the user object
  const hash = user.password_hash;
  // Compare the password with the hash
  const result = await bcrypt.compare(plaintextPassword, hash);
  return result;
}

module.exports = {
  loginWithEmailAndPassword,
}