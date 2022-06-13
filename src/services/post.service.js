const urlSlug = require('url-slug');
const db = require('../db/models');

const queryPosts = async(filter, options) => {
  let posts = await db.Posts.findAll({
    where: filter,
    ...options,
  });
  return posts;
};

const getPostById = async(id) => {
  let post = await db.Posts.findOne({
    where: {
      id,
    },
  });
  return post;
}

const getPostByPermalink = async(permalink) => {
  let post = await db.Posts.findOne({
    where: {
      permalink,
    },
  });
  return post;
}

const createPost = async(body) => {
  body = await setPostDefaults(body);
  post = await db.Posts.create(body);
  return post;
}

const updatePost = async(id, body) => {
  let post = await db.Posts.findByPk(id);
  body = await setPostDefaults(body, true);
  post = await post.update(body);
  return post;
}

const setPostDefaults = async(body, update = false) => {
  // If the permalink is not set, generate one
  if (!body.permalink) {
    body.permalink = urlSlug(body.title);
  }

  if (!update) {
    // Ensure that the permalink is unique
    let permalink = body.permalink;
    let post = await db.Posts.findOne({
      where: {
        permalink,
      },
    });
    // If the permalink is not unique, add a number to the end
    if (post) {
      let number = Math.floor(1000 + Math.random() * 9000);
      body.permalink = `${permalink}-${number}`;
    }
  }

  // If the published date is not set, set it to now
  if (body.published_date === '') {
    body.published_date = new Date();
  }

  return body;
}


module.exports = {
  getPostById,
  getPostByPermalink,
  queryPosts,
  createPost,
  updatePost
}