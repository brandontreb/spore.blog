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

module.exports = {
  updateDashboard,
  updateNav
}