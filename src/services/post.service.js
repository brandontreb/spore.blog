const urlSlug = require('url-slug');
const db = require('../db/models');
const mediaService = require('./media.service');

const queryPosts = async (filter, options) => {
  let posts = await db.Posts.findAll({
    where: filter,
    ...options,
  });
  return posts;
};

const getPostById = async (id, include = ["media", "blog"]) => {
  let post = await db.Posts.findOne({
    where: {
      id,
    },
    include: include
  });
  return post;
}

const getPostBySlug = async (slug, include = ["media", "blog"]) => {
  let post = await db.Posts.findOne({
    where: {
      slug,
    },
    include: include
  });
  return post;
}

const getPostByPermalink = async (permalink, include = ["media", "blog"]) => {
  let post = await db.Posts.findOne({
    where: {
      permalink,
    },
    include: include
  });
  return post;
}

const createPost = async (body) => {
  body = await setPostDefaults(body);
  try {
    post = await db.Posts.create(body);
    await associateMediaFilesWithPost(post, body.media);
    return post;
  } catch (error) {
    console.log(error);
    return null;
  }
}

const updatePost = async (id, body) => {
  let post = await db.Posts.findByPk(id);
  body = await setPostDefaults(body, true);
  post = await post.update(body);
  await associateMediaFilesWithPost(post, body.media);
  return post;
}

const deletePost = async (id) => {
  let post = await db.Posts.findByPk(id);
  post = await post.destroy();
  return post;
}

const setPostDefaults = async (body, update = false) => {
  // If the slug is not set, generate one
  if (!body.slug) {
    if (body.title) {
      body.slug = urlSlug(body.title);
    } else {
      // If the title is not set, generate a random slug
      body.slug = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }
  }

  if (!update) {
    // If the published date is not set, set it to now
    if (body.published_date === '') {
      body.published_date = new Date();
    }
    // Ensure that the slug is unique
    let slug = body.slug;
    let post = await db.Posts.findOne({
      where: {
        slug,
      },
    });
    // If the slug is not unique, add a number to the end
    if (post) {
      let number = Math.floor(1000 + Math.random() * 9000);
      body.slug = `${slug}-${number}`;
    }

    if(!body.permalink) {
      const date = body.published_date.toISOString().split('T')[0].replaceAll('-', '/');
      body.permalink = `/${date}/${slug}`;
    } else {
      // add a / to the beginning of the permalink if it doesn't have one
      if (body.permalink.indexOf('/') !== 0) {
        body.permalink = `/${body.permalink}`;
      }
    }
  }

  // Check for a title
  body.is_note = !body.title || body.title.length === 0;

  // Check for an @ reply
  const regex = /@https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
  let replyTo = body.content.match(regex);
  if(replyTo) {
    replyTo = replyTo[0].replace('@', '');
    body.replyTo = replyTo;
  }

  return body;
}

const associateMediaFilesWithPost = async (post, mediaFiles) => {
  // Create the media objects if necessary
  if (mediaFiles) {
    mediaFiles.forEach(async (media) => {
      let mediaBody = {
        post_id: post.id,
        type: 'image', // TODO: Hardcoded for now, update when more media supported
        originalFilename: media.originalname,
        path: media.path,
        mimeType: media.mimetype,
        filename: media.filename,
        size: media.size
      };
      await mediaService.createMedia(mediaBody);
    });
  }
}

module.exports = {
  getPostById,
  getPostBySlug,
  getPostByPermalink,
  queryPosts,
  createPost,
  updatePost,
  deletePost,
  associateMediaFilesWithPost
}