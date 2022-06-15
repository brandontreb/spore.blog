'use strict';

const moment = require('moment');
const MarkdownIt = require('markdown-it');
const md = new MarkdownIt();
const { encode } = require('html-entities');
const { markdownToTxt } = require('markdown-to-txt');

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
    published_date_formatted: {
      type: DataTypes.VIRTUAL,
      get() {
        return `${moment(this.published_date).format("DD MMM, YYYY")}`;
      },
      set(value) {
        throw new Error('Do not try to set the `published_date_formatted` value!');
      }
    },
    published_date_formatted_rss: {
      type: DataTypes.VIRTUAL,
      get() {
        return `${moment(this.published_date).format("ddd, DD MMM YYYY HH:mm:ss")} +0800`;
      },
    },
    published_date_formatted_picker: {
      type: DataTypes.VIRTUAL,
      get() {
        return `${moment(this.published_date).format("YYYY-MM-DD")}`;
      },
    },
    content_html: {
      type: DataTypes.VIRTUAL,
      get() {
        return md.render(this.content);
      },
    },
    content_text: {
      type: DataTypes.VIRTUAL,
      get() {
        return markdownToTxt(this.content);
      }
    },
    content_html_encoded: {
      type: DataTypes.VIRTUAL,
      get() {
        return encode(md.render(this.content));
      },
    }
  }, {
    sequelize,
    modelName: 'Posts',
  });
  return Posts;
};