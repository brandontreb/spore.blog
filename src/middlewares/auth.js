const passport = require('passport');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { roleRights } = require('../config/roles');

const auth = (...requiredRights) => async(req, res, next) => {
  return new Promise((resolve, reject) => {
      resolve();
    })
    .then(() => next())
    .catch((err) => next(err));
};

module.exports = auth;