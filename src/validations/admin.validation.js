const Joi = require('joi');

const update = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    baseURL: Joi.string().required(),
    languageCode: Joi.string().optional().allow(null, ''),
    theme: Joi.string().optional().allow(null, ''),
    meta_description: Joi.string().optional().allow(null, ''),
    favicon: Joi.string().optional().allow(null, ''),
    // paginate: Joi.number().optional().allow(null, ''),
    // summaryLength: Joi.number().optional().allow(null, ''),
    // rssLimit: Joi.number().optional().allow(null, ''),
    // googleAnalytics: Joi.string().optional().allow(null, ''),
    // disqusShortname: Joi.string().optional().allow(null, ''),
    // twitter: Joi.string().optional().allow(null, ''),
    // facebook: Joi.string().optional().allow(null, ''),
    // github: Joi.string().optional().allow(null, ''),
    // linkedin: Joi.string().optional().allow(null, ''),
    // googlePlus: Joi.string().optional().allow(null, ''),
    // instagram: Joi.string().optional().allow(null, ''),
    // youtube: Joi.string().optional().allow(null, ''),
    // soundcloud: Joi.string().optional().allow(null, ''),
    // medium: Joi.string().optional().allow(null, ''),
    // footer: Joi.string().optional().allow(null, ''),
    // customCSS: Joi.string().optional().allow(null, ''),
    // customJS: Joi.string().optional().allow(null, ''),
    // params: Joi.object().optional().allow(null, ''),
  })
} 

/*
const install = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    url: Joi.string().required(),
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    password_again: Joi.string().required(),
  })
}

const updateBlog = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    url: Joi.string().required(),
    homepage_content: Joi.string().allow('').optional(),
    meta_description: Joi.string().allow('').optional(),
    language: Joi.string().allow('').optional(),
    nav: Joi.string().allow('').optional(),
    favicon: Joi.string().allow('').optional(),
  })
}

const createPost = {
  params: {
    id: Joi.string()
  },
  body: Joi.object().keys({
    title: Joi.string().allow('').optional(),
    slug: Joi.string().allow(null, ''),
    published_date: Joi.date().allow(null, '').optional(),
    content: Joi.string().allow(null, ''),
    meta_description: Joi.string().allow(null, '').optional(),
    meta_image_url: Joi.string().allow(null, '').optional(),
    tags: Joi.string().allow(null, '').optional(),
    is_page: Joi.boolean().default(false),
    show_in_feed: Joi.boolean().default(false),
    status: Joi.string().default('published'),    
    media_files: Joi.alternatives().try(Joi.array().items(Joi.string()), Joi.string()).allow(null, '').optional(),
    type: Joi.string().default('post'),
    meta: Joi.object().allow(null, '').optional(),
    append_media: Joi.boolean().default(true),
  })
};

const deletePost = {
  params: {
    postId: Joi.string().required()
  }
}

module.exports = {
  install,
  updateBlog,
  createPost,
  deletePost,
}*/

module.exports = {
  update,
}