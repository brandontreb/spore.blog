const Joi = require('joi');

const updateSettings = {
  body: Joi.object().keys({
    title: Joi.string().allow('').optional(),
    url: Joi.string().required(),
    homepage_content: Joi.string().allow('').optional(),
    language: Joi.string().allow('').optional(),
    meta_description: Joi.string().allow('').optional(),
    meta_image_url: Joi.string().allow('').optional(),
  })
}

module.exports = {
  updateSettings
}