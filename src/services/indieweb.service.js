const mfo = require('mf-obj');
const httpStatus = require('http-status');
const webmention = require('send-webmention');
const URL = require("url").URL;
const ApiError = require('../utils/ApiError');
const db = require('../db/models');
const { postService } = require('../services');
const config = require('../config/config');

const queryWebmentions = async (filter, options) => {
  let webmentions = await db.Webmention.findAll({
    where: filter,
    ...options,
  });
  return webmentions;
};

const sendWebmentions = async (source, targets) => {
  targets.forEach(async (target) => {          

      webmention(source, target, `${config.name}/${config.version}`, function (err, obj) {
        if (err) {
          console.log(err);
          return;
        }
        if (obj.success) {
          console.log(`Sending webmention to ${target}. Success!`);
        } else {
          console.log('Failure :(');
        }
      });
  });
}

const processWebmention = async (source, target) => {
  return new Promise(async (resolve, reject) => {
    // Ensure that source and target are valid urls
    if (!stringIsAValidUrl(source) || !stringIsAValidUrl(target)) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid source or target url');    
    }

    if (!source || !target) {
      return res.status(400).json({
        status: 'error',
        message: 'Missing source or target'
      });
    }

    mfo.getEntry(source)
      .then(async entry => {        
        let permalink = new URL(target).pathname;
        let post = await postService.getPostByPermalink(permalink);          

        if(!post) {
          reject( new ApiError(httpStatus.NOT_FOUND, 'Post not found') );
        }

        let webmention = await queryWebmentions({
          source: source,
          target: target,
        });        

        let webmentionObject = {
          target: target,
          source: source,
          post_id: post.id,
          name: entry.name,
          published: entry.published,
          content_value: entry.content.value,
          content_html: entry.content.html,
          summary: entry.summary,
          url: entry.url,
          author: entry.author,
          category: entry.category,
          syndication: entry.syndication,
          syndicateTo: entry.syndicateTo,
          photo: entry.photo,
          audio: entry.audio,
          video: entry.video,
          replyTo: entry.replyTo,
          likeOf: entry.likeOf,
          repostOf: entry.repostOf,
          embed: entry.embed,
          children: entry.children
        };
        if(webmention.length > 0) {
          webmention = webmention[0];
          webmention = webmention.update(webmentionObject);
        } else {
          db.Webmention.create(webmentionObject);
        }
        resolve(webmention);
      })
      .catch(err => {
        console.log(err);
        reject( new ApiError(httpStatus.BAD_REQUEST, err));
      });
  });
};

const stringIsAValidUrl = (s) => {
  try {
    new URL(s);
    return true;
  } catch (err) {
    return false;
  }
};

module.exports = {
  queryWebmentions,
  sendWebmentions,
  processWebmention,
};