'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Blog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Blog.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    title: DataTypes.STRING,
    homepage_content: DataTypes.TEXT,
    homepage_content_html: DataTypes.TEXT,
    meta_description: DataTypes.TEXT,
    nav: DataTypes.TEXT,
    nav_html: DataTypes.TEXT,
    language: DataTypes.STRING,
    favicon: DataTypes.STRING,
    meta_image_url: DataTypes.STRING,
    external_stylesheet_url: DataTypes.STRING,
    custom_styles: DataTypes.TEXT,
    overwrite_styles: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Blog',
  });
  return Blog;
};