'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Posts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      blog_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      permalink: {
        type: Sequelize.STRING
      },
      published_date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      content: {
        type: Sequelize.TEXT
      },
      meta_description: {
        type: Sequelize.STRING
      },
      meta_image_url: {
        type: Sequelize.STRING
      },
      tags: {
        type: Sequelize.STRING
      },
      is_page: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      show_in_feed: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      is_note: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      published: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
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
    await queryInterface.dropTable('Posts');
  }
};