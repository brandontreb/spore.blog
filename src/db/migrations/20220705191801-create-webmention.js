'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Webmentions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },      
      target : {
        type: Sequelize.STRING
      },
      source: {
        type: Sequelize.STRING
      },      
      post_id: {
        type: Sequelize.INTEGER
      },
      name: {          
        type: Sequelize.STRING
      },
      published: {
        type: Sequelize.DATE
      },
      content_value: {
        type: Sequelize.TEXT
      },
      content_html: {
        type: Sequelize.TEXT
      },
      summary: {
        type: Sequelize.STRING
      },
      url: {
        type: Sequelize.STRING
      },
      author: { // Object
        type: Sequelize.JSON
      },
      category: { // Array
        type: Sequelize.JSON
      }, 
      syndication: { // Array
        type: Sequelize.JSON
      },
      syndicateTo: { // Array
        type: Sequelize.JSON
      },
      photo: { // Array
        type: Sequelize.JSON
      },
      audio: { // Array
        type: Sequelize.JSON
      },
      video: { // Array
        type: Sequelize.JSON
      },
      replyTo: { // Array
        type: Sequelize.JSON
      },      
      likeOf: { // Array
        type: Sequelize.JSON
      },
      repostOf: { // Array
        type: Sequelize.JSON
      },
      embed: {
        type: Sequelize.JSON
      },
      children: {
        type: Sequelize.JSON
      },      
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Responses');
  }
};