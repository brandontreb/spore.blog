const Joi = require('joi');

const createPost = {
  params: {
    id: Joi.string()
  },
  body: Joi.object().keys({
    title: Joi.string().allow('').optional(),
    permalink: Joi.string().allow(null, ''),
    published_date: Joi.date().allow(null, ''),
    content: Joi.string().allow(null, ''),
    meta_description: Joi.string().allow(null, ''),
    meta_image_url: Joi.string().allow(null, ''),
    tags: Joi.string().allow(null, ''),
    is_page: Joi.boolean().default(false),
    show_in_feed: Joi.boolean().default(false),
    published: Joi.boolean().default(false),    
    media_files: Joi.alternatives().try(Joi.array().items(Joi.string()), Joi.string()),
  })
};

const deletePost = {
  params: {
    id: Joi.string().required()
  }
}

module.exports = {
  createPost,
  deletePost
}