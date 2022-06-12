const urlSlug = require('url-slug');
const db = require('../db/models');

const queryPosts = async(filter, options) => {
  let posts = await db.Posts.findAll({
    where: filter,
    ...options,
  });
  return posts;
};

const createPost = async(body) => {
  // If the permalink is not set, generate one
  if (!body.permalink) {
    body.permalink = urlSlug(body.title);
  }

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

  // If the published date is not set, set it to now
  if (body.published_date === '') {
    body.published_date = new Date();
  }

  post = await db.Posts.create(body);
  return post;
}

const updatePost = async(id, body) => {
  let post = await db.Posts.findByPk(id);
  post = await post.update(body);
  return post;
}

module.exports = {
  queryPosts,
  createPost,
  updatePost
}