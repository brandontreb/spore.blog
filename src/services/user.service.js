const bcrypt = require("bcrypt");
const fs = require('fs');
const path = require('path');

const saltRounds = 10;

const loginWithEmailAndPassword = async(email, plaintextPassword) => {  
  // Get the contents of the file data/user.json using fs
  const user = JSON.parse(fs.readFileSync('data/user.json', 'utf8'));
  // compare lowercase email with lowercase user.email
  if (email.toLowerCase() !== user.email.toLowerCase()) {
    return false;
  }
  // Get the hash from the user object
  const hash = user.password;
  // Compare the password with the hash  
  const result = await bcrypt.compare(plaintextPassword, hash);
  return result;
}

const createUser = async (email, password) => {
  let user = {
    email: email,
    password: bcrypt.hashSync(password, saltRounds),
  }
  // create data/user.json
  const userPath = path.join(__dirname, '../../data/user.json');
  // write user object to data/user.json
  fs.writeFileSync(userPath, JSON.stringify(user, null, 2));
  return user;
}

const userExists = async () => {
  // check if data/user.json exists
  if (!fs.existsSync('data/user.json')) {
    return false;
  }  
  console.log('user.json exists');
  // Get the contents of the file data/user.json using fs
  const user = JSON.parse(fs.readFileSync('data/user.json', 'utf8'));
  // check if user.email exists
  return user.email && user.password;
}

module.exports = {
  loginWithEmailAndPassword,
  createUser,
  userExists,
}