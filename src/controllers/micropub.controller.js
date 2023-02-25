const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const logger = require('../config/logger');
const { micropubService, hugoService } = require('../services');
const config = require('../config/config');

const create = catchAsync(async (req, res) => {
  let body = req.body;
  logger.debug('micropub create: %s\n%o', req.method, body);
  // Process the micropub request
  let micropubDocument = req.is('json') ? micropubService.processJsonEncodedBody(body) : micropubService.processFormEncodedBody(body);
  // Convert the micropub document to hugo format
  let {frontMatter, content} = micropubService.micropubDocumentToHugo(micropubDocument);
  logger.debug('frontMatter: %o', frontMatter);
  logger.debug('content: %s', content);  
  // Create the hugo post
  hugoService.createPost(frontMatter, content);  
  // Rebuild the site
  hugoService.generateSite();
  // Get the url of the post
  let url = hugoService.getPostUrl(frontMatter);

  logger.debug(`Redirecting to url: ${url}`)

  // Redirect to the post
  res.set('Location', `${url}`).status(httpStatus.CREATED).send();
});

module.exports = {
  create,
};