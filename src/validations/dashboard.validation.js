const Joi = require('joi');

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

const install = {
  body: Joi.object().keys({
    blog_title: Joi.string().required(),
    blog_url: Joi.string().required(),
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    password_again: Joi.string().required(),    
  })
}

module.exports = {
  updateDashboard,
  updateNav,
  updateStyles,
  install
}