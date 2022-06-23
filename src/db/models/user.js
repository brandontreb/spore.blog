'use strict';
const crypto = require('crypto')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    full_name: DataTypes.STRING,
    website: DataTypes.STRING,
    about: DataTypes.TEXT,
    profile_photo:DataTypes.STRING,
    profile_photo_gravatar: {
      type: DataTypes.VIRTUAL,
      get() {
        return `https://www.gravatar.com/avatar/${this.email_hash}?s=100`;
      }
    },
    email_hash: {
      type: DataTypes.VIRTUAL,
      get() {
        return crypto.createHash('md5').update(this.email).digest('hex');
      }
    }
  }, {
    sequelize,
    modelName: 'Users',
  });
  return User;
};