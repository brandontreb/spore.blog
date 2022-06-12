'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Posts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Posts.init({
    title: DataTypes.STRING,
    permalink: DataTypes.STRING,
    published_date: DataTypes.DATE,
    content: DataTypes.TEXT,
    meta_description: DataTypes.STRING,
    meta_image_url: DataTypes.STRING,
    tags: DataTypes.STRING,
    is_page: DataTypes.BOOLEAN,
    show_in_feed: DataTypes.BOOLEAN,
    published: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Posts',
  });
  return Posts;
};