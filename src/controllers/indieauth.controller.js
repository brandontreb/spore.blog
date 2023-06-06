const uniquid = require('uniqid');
const utils = require('../utils/utils');
const {indieAuthService, tokenService, oauthService} = require('../services');
const logger = require('../config/logger');

const auth = async(req, res) => {
  let hugo = res.locals.hugo;
  logger.debug('Indie Auth Request with params: %j', req.query);
  let { client_id, me, redirect_uri, scope, state } = req.query;
  if (!me) {
    return res.redirect(`${redirect_uri}?error=parameter_absent&error_description=me+parameter+absent&state=${state}`);
  }
  me = utils.normalizeUrl(me);
  // if (me !== blog.url) {
  //   return res.redirect(`${redirect_uri}?error=invalid_request&error_description=me+parameter+does+not+match+the+blog+url&state=${state}`);
  // }
  if (!client_id) {
    client_id = req.get('Referrer')
  }
  req.session.indieAuth = {...req.query };
  if (!scope) {
    req.session.indieAuth.scope = 'profile';
  }
  let insecure = req.query.code_challenge === null;
  res.render('indieWeb/authorize', {...req.session.indieAuth, hugo, redirect_uri, insecure });
}

const approve = async(req, res) => {
  let hugo = res.locals.hugo;
  if (!req.session.indieAuth) {
    return res.redirect('/');
  }
  const { redirect_uri, state } = req.session.indieAuth;
  const code = uniquid('sp');

  let indieAuthRequestBody = {    
    client_id: req.session.indieAuth.client_id,
    redirect_uri: redirect_uri,
    scope: req.session.indieAuth.scope,
    code: code,
    state: state,
    response_type: req.session.indieAuth.response_type,
    code_challenge: req.session.indieAuth.code_challenge,
    code_challenge_method: req.session.indieAuth.code_challenge_method,
  }
  
  await indieAuthService.saveIndieAuthRequest(indieAuthRequestBody);

  let redirectUri = `${redirect_uri}?code=${code}&state=${state}&me=${encodeURIComponent(hugo.baseURL)}`;
  logger.debug('redirectUri: %s', redirectUri);
  res.redirect(redirectUri);
}

const token = async(req, res) => {
  let hugo = res.locals.hugo;

  // Check for custom actions
  if (req.body.action && req.body.action === 'revoke') {
    return res.json({});
  }

  const { grant_type, code, redirect_uri, code_verifier } = req.body;

  if (!code) {
    return res.status(400).json({
      error: 'invalid_request',
      error_description: 'code+parameter+absent'
    });
  }

  let indieAuthRequest = await indieAuthService.getIndieAuthRequest(code);
  logger.debug('indieAuthRequest: %j', indieAuthRequest);

  if (!indieAuthRequest) {
    return res.status(400).json({
      error: 'invalid_request',
      error_description: 'invalid+code'
    });
  }

  if (indieAuthRequest.code_challenge && !code_verifier) {
    return res.status(400).json({
      error: 'invalid_request',
      error_description: 'code_verifier+parameter+absent'
    });
  }

  // PKCE Check
  if (indieAuthRequest.code_challenge) {
    if (grant_type === 'authorization_code' || grant_type == undefined) {
      let pkceVerifyChallengePassed = await oauthService.verifyPKCECodeChallengeFromVerifier(code_verifier,
        indieAuthRequest.code_challenge, indieAuthRequest.code_challenge_method);
      if (!pkceVerifyChallengePassed) {
        return res.status(400).json({
          error: 'invalid_grant',
          error_description: 'invalid+code+verifier'
        });
      }
    } else {
      return res.status(400).json({
        error: 'invalid_request',
        error_description: 'invalid+grant_type'
      });
    }
  }

  // Make sure redirect_uri is the same as the one in the request  
  if (redirect_uri !== indieAuthRequest.redirect_uri) {
    return res.status(400).json({
      error: 'invalid_request',
      error_description: 'invalid+redirect_uri'
    });
  }
  
  let scope = indieAuthRequest.scope;
  let clientId = indieAuthRequest.client_id;
  let indieAuthRequestId = indieAuthRequest.code;
  let me = hugo.baseURL;

  let tokens = await tokenService.generateIndieAuthTokens(me, scope, clientId, indieAuthRequestId);

  res.json({
    "me": hugo.baseURL,
    "profile": {
      "name": hugo.Author.name,
      "url": hugo.Author.url,
      "photo": hugo.Author.avatar,
    },
    ...tokens,
  });
}

/*
const verifyToken = async(req, res) => {
  let token = req.headers.authorization;

  if (!token) {
    return res.status(400).json({
      error: 'invalid_request',
      error_description: 'token+parameter+absent'
    });
  }

  token = token.split(' ')[1];

  try {
    const tokenDoc = await tokenService.verifyToken(token);
    if (!tokenDoc) {
      return res.status(400).json({
        error: 'invalid_request',
        error_description: 'invalid+token'
      });
    }

    res.json({
      ...tokenDoc,
    });
  } catch (error) {
    res.status(400).json({
      error: 'invalid_request',
      error_description: 'invalid+token'
    });
  }
};
*/
module.exports = {
  auth,
  approve,
  token,
  //verifyToken
}