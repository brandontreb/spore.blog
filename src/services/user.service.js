const bcrypt = require("bcrypt");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const db = require('../db/models');

const createUser = async (userBody) => {  
  const user = await db.Users.create(userBody);
  return user;
};

const updateUser = async (userId, userBody) => {
  const user = await db.Users.findByPk(userId);
  if (!user) {
    throw new Error('User not found');
  }
  const { password } = userBody;
  if (password && password.length > 0) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    userBody.password = hash;
  }

  const updatedUser = await user.update(userBody);
  return updatedUser;
}

const getUser = async (userId) => {
  try {
    const user = await db.Users.findByPk(userId);
    return user;
  } catch (err) {
    console.log(err);
  }
  return null;
}

const getUserByEmailOrUsername = async (email) => {
  try {
    const user = await db.Users.findOne({ 
      where: { 
        [Op.or]: [{email}, {username: email}]
      } 
    });
    return user;
  } catch (err) {
    console.log(err);
  }
  return null;
}

module.exports = {
  createUser,
  updateUser,
  getUser,
  getUserByEmailOrUsername
}
