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
    
  // Generate the url to the post
  let date = new Date(frontMatter.date);
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  if(month <= 9)
    month = '0'+month;
  let day = date.getDate();
  if(day <= 9)
    day = '0'+day;
  let dateString = `${year}/${month}/${day}`;
  const url = `${config.hugo.config.baseURL}/${dateString}/${frontMatter.slug}/`;
  logger.debug(`Redirecting to url: ${url}`)

  // Redirect to the post
  res.set('Location', `${url}`).status(httpStatus.CREATED).send();
});

module.exports = {
  create,
};