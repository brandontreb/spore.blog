'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Webmention extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Posts, {
        foreignKey: 'post_id',
        as: 'post'
      });
    }
  }
  Webmention.init({
    target : {
      type: DataTypes.STRING
    },
    source: {
      type: DataTypes.STRING
    },      
    post_id: {
      type: DataTypes.INTEGER
    },
    name: {          
      type: DataTypes.STRING
    },
    published: {
      type: DataTypes.DATE
    },
    content_value: {
      type: DataTypes.TEXT
    },
    content_html: {
      type: DataTypes.TEXT
    },
    summary: {
      type: DataTypes.STRING
    },
    url: {
      type: DataTypes.STRING
    },
    author: { // Object
      type: DataTypes.JSON
    },
    category: { // Array
      type: DataTypes.JSON
    }, 
    syndication: { // Array
      type: DataTypes.JSON
    },
    syndicateTo: { // Array
      type: DataTypes.JSON
    },
    photo: { // Array
      type: DataTypes.JSON
    },
    audio: { // Array
      type: DataTypes.JSON
    },
    video: { // Array
      type: DataTypes.JSON
    },
    replyTo: { // Array
      type: DataTypes.JSON
    },      
    likeOf: { // Array
      type: DataTypes.JSON
    },
    repostOf: { // Array
      type: DataTypes.JSON
    },
    embed: {
      type: DataTypes.JSON
    },
    children: {
      type: DataTypes.JSON
    }
  }, {
    sequelize,
    modelName: 'Webmention',
  });
  return Webmention;
};