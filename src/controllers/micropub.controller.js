const httpStatus = require('http-status');
const fetch = require("node-fetch");

const catchAsync = require('../utils/catchAsync');
const logger = require('../config/logger');
const { micropubService, hugoService } = require('../services');
const config = require('../config/config');

const create = catchAsync(async (req, res) => {
  let body = req.method === 'POST' ? req.body : req.query;
  let hugo = hugoService.getConfig();

  // check if get request
  if (req.method === 'GET') {
    if (req.query['q'] === 'config') {
      return res.json({
        "media-endpoint": `${hugo.baseURL}/micropub/media`,
        "syndicate-to": []
      });
    } 
    if(req.query['q'] === 'syndicate-to') {
      return res.json([]);
    }
    if(req.query['q'] === 'category') {
      // Redirect to config.baseURL/tags/feed.json
      let response = await fetch(`${hugo.baseURL}/tags/feed.json`);      
      return res.json(await response.json());
    }
    if(req.query['q'] === 'source') {
      let url = req.query.url;
      if(url) {
        // if url doesnt have a trailing slash, add one
        if(!url.endsWith('/')) {
          url = `${url}/`;
        }

        // Fetch the feed.json file
        let response = await fetch(`${url}feed.json`);      
        let json = await response.json();
        
        // if json[key] is not an array, make it one
        Object.keys(json).forEach(function(key, index) {          
          json[key] = Array.isArray(json[key]) ? json[key] : [json[key]];          
        });

        // if json has a tags key, replace it with category
        if(json.tags) {
          json.category = json.tags;
          delete json.tags;
        }

        // if json has a date key, replace it with published
        if(json.date) {
          json.published = json.date;
          delete json.date;
        }

        // if json has a photos key, replace it with photo
        if(json.photos) {
          json.photo = json.photos.map(photo => photo.url);
          delete json.photos;
        }

        json['post-status'] = json.draft && json.draft === true ? ['draft'] : ['published'];
        json['draft'] = json['post-status'][0] === 'draft';

        // Build a source object
        let source = {
          type: ['h-entry'],
          properties: {
            ...json
          }
        };

        return res.json(source);
      }
      return [];
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

  if(body.action && body.action === 'update') {
    logger.debug('micropub update: %s\n%o', req.method, body);
    let url = body.url;
    // remove ending slash if there is one
    if (url.endsWith('/')) {
      url = url.slice(0, -1);
    }
    let slug = url.split('/').pop();    
    let post = hugoService.getPostBySlug(slug);
    if(!post) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Post not found');
    }
    if(body.replace ) {
      if(body.replace.content) {
        let content = Array.isArray(body.replace.content) ? body.replace.content[0] : body.replace.content;
        post.content = content;
      }
      if(body.replace.name) {
        let name = Array.isArray(body.replace.name) ? body.replace.name[0] : body.replace.name;
        post.frontMatter.title = name;
      }

      if(body.replace['post-status']) {
        let postStatus = Array.isArray(body.replace['post-status']) ? body.replace['post-status'][0] : body.replace['post-status'];
        post.frontMatter.draft = postStatus === 'draft';
      }

      hugoService.updatePost(post, post.content);
      hugoService.generateSite();
      return res.status(httpStatus.NO_CONTENT).send();
    }
  }



  logger.debug('micropub create: %s\n%o', req.method, body);
  // Process the micropub request
  let micropubDocument = req.is('json') ? micropubService.processJsonEncodedBody(body) : micropubService.processFormEncodedBody(body);
  // Convert the micropub document to hugo format
  let {frontMatter, content} = micropubService.micropubDocumentToHugo(micropubDocument);  
  frontMatter['draft'] = frontMatter['post-status'][0] === 'draft' 
  || frontMatter['post-status'][0] === 'unpublished' ||
  frontMatter['draft'] === true ? true : false;

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
  let hugo = hugoService.getConfig();
  logger.info('micropub media request: %j', req.files);

  if (!req.files || req.files.length === 0) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'No file uploaded');
  }

  let response = [];
  let year = new Date().getFullYear();
  for (let file of req.files.file) {
    response.push({
      url: `${hugo.baseURL}/uploads/${year}/${file.filename}`,
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