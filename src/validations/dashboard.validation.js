const Joi = require('joi');
const { objectId } = require('./custom.validation');

const updateDashboard = Joi.object().keys({
  title: Joi.string().required(),
});

module.exports = {
  updateDashboard
}