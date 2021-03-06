'use strict';

const moment = require('moment');
const MarkdownIt = require('markdown-it');
const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true
});
const { encode } = require('html-entities');
const { markdownToTxt } = require('markdown-to-txt');
const cheerio = require('cheerio');

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
      this.belongsTo(models.Users, {
        foreignKey: 'user_id',
        as: 'author'
      });

      this.belongsTo(models.Blogs, {
        foreignKey: 'blog_id',
        as: 'blog'
      });

      this.hasMany(models.Media, {
        foreignKey: 'post_id',
        as: 'media'
      });

      // this.hasMany(models.Responses, {
      //   foreignKey: 'post_id',
      //   as: 'responses'
      // });
    }
  }
  Posts.init({    
    title: DataTypes.STRING,
    slug: DataTypes.STRING,
    permalink: DataTypes.STRING,
    published_date: DataTypes.DATE,
    content: DataTypes.TEXT,
    meta_description: DataTypes.STRING,
    meta_image_url: DataTypes.STRING,
    tags: DataTypes.STRING,    
    replyTo: DataTypes.STRING,
    show_in_feed: DataTypes.BOOLEAN,
    is_note: DataTypes.BOOLEAN,
    is_page: DataTypes.BOOLEAN,    
    published: DataTypes.BOOLEAN,
    published_date_formatted: {
      type: DataTypes.VIRTUAL,
      get() {
        return `${moment(this.published_date).utcOffset(0, false).format("DD MMM, YYYY")}`;
      },
      set(value) {
        throw new Error('Do not try to set the `published_date_formatted` value!');
      }
    },
    published_date_formatted_rss: {
      type: DataTypes.VIRTUAL,
      get() {
        return `${moment(this.published_date).utcOffset(0, false).format("ddd, DD MMM YYYY HH:mm:ss")} +0800`;
      },
    },
    published_date_formatted_picker: {
      type: DataTypes.VIRTUAL,
      get() {
        // console.log(moment(this.published_date).utcOffset(0, false).format("YYYY-MM-DD h:mm:ss a"))
        return `${moment(this.published_date).utcOffset(0, false).format("YYYY-MM-DD")}`;
      },
    },
    content_html: {
      type: DataTypes.VIRTUAL,
      get() {
        let content = this.content;      

        // Remove the @url if this is a reply
        content = content.replace(/@https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g, (match) => {                  
          return '';
        });
        
        return md.render(content);
      },
    },
    content_html_with_media: {
      type: DataTypes.VIRTUAL,
      get() {
        let content = this.content_html;      
    
        if(this.media) {
          for(let media of this.media) {
            content =`${content}\n\n<p><img class="u-photo" src="${this.blog.url}/${media.path}" alt="${media.altText || ""}"></p>`;
          }
        }
        return md.render(content);
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
        return encode(this.content_html);
      },
    },
    content_html_with_media_encoded: {
      type: DataTypes.VIRTUAL,
      get() {
        return encode(this.content_html_with_media);
      },
    },
    url: {
      type: DataTypes.VIRTUAL,
      get() {        
        return `${this.blog.url}${this.permalink}`;
      }
    },
    links: {
      type: DataTypes.VIRTUAL,
      get() {
        const html = this.content_html;
        const $ = cheerio.load(html);
        const linkObjects = $('a');
        const links = [];
        for(let i = 0; i < linkObjects.length; i++) {
          const link = linkObjects[i];
          const href = link.attribs.href;          
          links.push(href);
        }

        // Add the reply to link if present
        if(this.replyTo) {
          links.push(this.replyTo);
        }

        return links;
      }
    }
  }, {
    sequelize,
    modelName: 'Posts',
  });
  return Posts;
};