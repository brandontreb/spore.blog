const fs = require('fs-extra');
const path = require('path');
const logger = require('../config/logger');

const saveIndieAuthRequest = async (indieAuthRequestBody) => {
  const { client_id, redirect_uri, scope, code, state, response_type, code_challenge, code_challenge_method } = indieAuthRequestBody;
  const indieAuthRequest = {
    client_id,
    redirect_uri,
    scope,
    code,
    state,
    response_type,
    code_challenge,
    code_challenge_method,
    created_at: new Date()
  };
  // write a file to data/indieauth/requests/{code}.json
  const indieAuthRequestPath = path.join(__dirname, `../../data/indieauth/requests/${code}.json`);
  logger.debug('Writing indieAuthRequest to %s', indieAuthRequestPath);
  fs.outputFileSync(indieAuthRequestPath, JSON.stringify(indieAuthRequest));
};

const getIndieAuthRequest = async (code) => {
  const indieAuthRequestPath = path.join(__dirname, `../../data/indieauth/requests/${code}.json`);
  logger.debug('Reading indieAuthRequest from %s', indieAuthRequestPath);
  let indieAuthRequest;  
  try {
    indieAuthRequest = fs.readJsonSync(indieAuthRequestPath);
  } catch (err) {
    logger.error('Error reading indieAuthRequest from %s', indieAuthRequestPath);
    logger.error(err);
    return null;
  }
  return indieAuthRequest;
};

module.exports = {
  saveIndieAuthRequest,
  getIndieAuthRequest
};
