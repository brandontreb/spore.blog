const Joi = require('joi');
const { objectId } = require('./custom.validation');

const updateDashboard = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    homepage_content: Joi.string().required(),
    meta_description: Joi.string().required(),
    language: Joi.string().required()
  })
};

const updateNav = {
  body: Joi.object().keys({
    nav: Joi.string().required(),
  })
};

const updateStyles = {
  body: Joi.object().keys({
    favicon: Joi.string().allow('').optional(),
    meta_image_url: Joi.string().allow('').optional(),
    external_stylesheet_url: Joi.string().allow('').optional(),
    custom_styles: Joi.string().allow('').optional(),
    overwrite_styles: Joi.boolean().required()
  })
}

module.exports = {
  updateDashboard,
  updateNav,
  updateStyles
}