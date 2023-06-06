const httpStatus = require('http-status');
const logger = require('../config/logger');
let { tokenService } = require('../services');
const config = require('../config/config');

const indieauth = (scopes = 'create') => async(req, res, next) => {
  // Check for a Bearer Token in headers
  let token = req.headers.authorization;
  if (!token) {
    // check if token found in the POST
    token = req.body.access_token;
    if (!token) {
      return res.status(httpStatus.UNAUTHORIZED).json({
        error: 'invalid_request',
        error_description: 'bearer+token+absent'
      });
    }
  } else {
    token = token.split(' ')[1];
  }

  // Check if the token is valid
  try {
    const tokenDoc = await tokenService.verifyToken(token);

    logger.debug('indieauth token verfied: %o', tokenDoc);

    let hugo = config.hugo.config;
    let user = config.user;    

    res.locals.hugo = hugo && Object.keys(hugo).length ? hugo : null;  
    res.locals.user = user;

    // Check the me value against blog.url
    const me = tokenDoc.me;
    if (!me) {
      return res.status(401).json({
        error: 'invalid_request',
        error_description: 'me+parameter+absent'
      });
    }

    // Check the scopes
    scopes = typeof scopes === 'string' ? scopes.split(' ') : scopes;
    let tokenScopes = tokenDoc.scope.split(' ');
    let scopesPassed = scopes.every(scope => tokenScopes.includes(scope));

    if (!scopesPassed) {
      return res.status(403).json({
        error: 'invalid_request',
        error_description: 'invalid+scope'
      });
    }

    next();
  } catch (err) {
    logger.error('token %s', err);
    return res.status(401).json({
      error: 'invalid_request',
      error_description: 'invalid+bearer+token'
    });
  }
};

module.exports = indieauth;