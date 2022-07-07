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
    entry: {
      type: DataTypes.JSON
    }
  }, {
    sequelize,
    modelName: 'Webmention',
  });
  return Webmention;
};