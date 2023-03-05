const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const logger = require('../config/logger');
const { micropubService, hugoService } = require('../services');
const config = require('../config/config');

const create = catchAsync(async (req, res) => {
  let body = req.method === 'POST' ? req.body : req.query;

  // check if get request
  if (req.method === 'GET') {
    if (req.query['q'] === 'config') {
      return res.json({
        "media-endpoint": `${config.hugo.config.baseURL}/micropub/media`,
        "syndicate-to": []
      });
    } 
    if(req.query['q'] === 'syndicate-to') {
      return res.json([]);
    }
    // TODO: Implement other queries (category, syndicate-to)
    return res.json([]);
  }

  if(body.action && body.action === 'delete') {
    logger.debug('micropub delete: %s\n%o', req.method, body);
    let url = body.url;
    // remove ending slash if there is one
    if (url.endsWith('/')) {
      url = url.slice(0, -1);
    }
    let slug = url.split('/').pop();        
    hugoService.deletePost(slug);
    hugoService.generateSite();
    return res.status(httpStatus.NO_CONTENT).send();
  }

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
  // Send webmentions for replies if there are any
  let links = hugoService.getLinksFromFrontMatterAndContent(frontMatter, content);
  if (links.length > 0) {
    await micropubService.sendWebmentions(url, links);
  }
  logger.debug(`Redirecting to url: ${url}`)
  // Redirect to the post
  res.set('Location', `${url}`).status(httpStatus.CREATED).send();
});

const media = catchAsync(async(req, res, next) => {
  logger.info('micropub media request: %j', req.files);

  if (!req.files || req.files.length === 0) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'No file uploaded');
  }

  let response = [];
  let year = new Date().getFullYear();
  for (let file of req.files.file) {
    response.push({
      url: `${config.hugo.config.baseURL}/uploads/${year}/${file.filename}`,
      mime_type: file.mimetype,
      published: new Date()
    })
  } 

  if (response.length === 1) {
    response = response[0];
  }

  // Rebuild the site
  hugoService.generateSite();

  return res.set({ 'Location': response.url }).status(httpStatus.CREATED).json(response);
});

module.exports = {
  create,
  media,
};