const moment = require('moment');
const webmention = require('send-webmention');

const logger = require('../config/logger');
const config = require('../config/config');
const utils = require('../utils/utils');

const reservedProperties = Object.freeze([
  'access_token',
  'q',
  'url',
  'update',
  'add',
  'delete'
]);

const formEncodedKey = /\[([^\]]*)]$/;

/**
 * @param {ParsedUrlQuery} body
 * @returns {ParsedMicropubStructure}
 */
const processFormEncodedBody = function (body) {
  /** @type {ParsedMicropubStructure} */
  const result = {
    type: body.h ? ['h-' + body.h] : undefined,
    properties: {},
    mp: {}
  };

  if (body.h) {
    delete body.h;
  }

  for (let key in body) {
    const rawValue = body[key];

    if (reservedProperties.includes(key)) {
      result[key] = rawValue;
    } else {
      /** @type {Object<string,any[]>} */
      let targetProperty;
      /** @type {string|string[]|Object<string,any>} */
      let value = rawValue;
      let subKey;

      while ((subKey = formEncodedKey.exec(key))) {
        if (subKey[1]) {
          /** @type {Object<string,any>} */
          const tmp = {};
          tmp[subKey[1]] = value;
          value = tmp;
        } else {
          value = ensureArrayAndCloneIt(value);
        }
        key = key.slice(0, subKey.index);
      }

      if (key && key.startsWith('mp-')) {
        key = key.slice(3);
        targetProperty = result.mp;
      } else {
        targetProperty = result.properties;
      }

      targetProperty[key] = ensureArrayAndCloneIt(value);
    }
  }

  cleanEmptyKeys(result);

  return result;
};

/**
 * @param {Object<string,any>} body
 * @returns {ParsedMicropubStructure}
 */
const processJsonEncodedBody = function (body) {
  /** @type {ParsedMicropubStructure} */
  const result = {
    properties: {},
    mp: {}
  };

  for (let key in body) {
    const value = body[key];

    if (reservedProperties.includes(key) || ['properties', 'type'].includes(key)) {
      result[key] = value;
    } else if (key && key.startsWith('mp-')) {
      key = key.slice(3);
      result.mp[key] = [].concat(value);
    }
  }

  for (const key in body.properties) {
    if (['url'].includes(key)) {
      result[key] = result[key] || [].concat(body.properties[key])[0];
      delete body.properties[key];
    }
  }

  cleanEmptyKeys(result);

  return result;
};

/**
 * @param {Object<string,any>} result
 */
const cleanEmptyKeys = function (result) {
  for (const key in result) {
    if (typeof result[key] === 'object' && Object.getOwnPropertyNames(result[key])[0] === undefined) {
      delete result[key];
    }
  }
};

/**
 * @template T
 * @param {MaybeArray<T>} value
 * @returns {T[]}
 */
const ensureArrayAndCloneIt = (value) => Array.isArray(value) ? [...value] : [value];

const sendWebmentions = async (source, targets) => {
  // if targets isn't an array, make it one
  targets = Array.isArray(targets) ? targets : [targets];
  if (targets.length === 0) {
    return;
  }  
  logger.debug(`Sending webmentions from ${source} to ${targets}`);  
  for (let i = 0; i < targets.length; i++) {
    await send(source, targets[i]);
  }
  console.log('done')
}

const send = async (source, target) => {  
  return new Promise(resolve => {    
    webmention(source, target, `${config.name}/${config.version}`, function (err, obj) {      
      if (err) {
        logger.error(err);
        resolve(false);
      }
      if (obj && obj.success) {
        logger.debug(`Sending webmention to ${target}. Success!`);
        resolve(true);
      } else {
        logger.error(`Sending webmention to ${target}. Failed with error %o!`, obj);
        resolve(false);
      }
    });
  });
}

const micropubDocumentToHugo = (document) => {
  logger.debug('Converting micropub document to hugo format %o', document);
  const { properties, mp } = document;

  let content = properties.content && properties.content[0] ? properties.content[0] : '';
  // check if content is an object, if so, get the html property
  content = typeof content === 'object' ? utils.decodeHTMLEntities(content.html) : content;
  let name = properties.name && properties.name[0] ? properties.name[0] : null;
  let published = properties.published && properties.published[0] ? properties.published[0] : moment().format();
  let category = properties.category && properties.category.length > 0 ? properties.category : null;
  let slug = mp && mp.slug && mp.slug.length ? mp.slug[0] : utils.slugify(name && name.length ? name : utils.randomStringOfLength(16));
  let postType = getPostType(properties);

  let additionalPropertyKeys = Object.keys(properties).filter(key => !['content', 'name', 'published', 'category'].includes(key));
  logger.debug('Additional property keys %o', additionalPropertyKeys);
  // get values of additional properties and add them as key/values to the front matter
  let additionalProperties = {};
  additionalPropertyKeys.forEach(key => {    
    additionalProperties[key] = properties[key];
  });
  logger.debug('Additional properties %o', additionalPropertyKeys);

  let hugo = {
    frontMatter: {
      title: name,
      date: published,
      slug: slug,
      tags: category,
      type: postType === 'reply' ? 'reply' : 'post', // all posts are either of type post or reply
      post_type: postType,
      ...additionalProperties
    },
    content
  }

  addReplyToFrontMatter(hugo, properties);
  transformPhotosInFrontMatter(hugo, properties);
  addPhotosInFrontMatterToContent(hugo, properties);

  return hugo;
};

const hugoToMicropubDocument = (hugo) => {
  logger.debug('Converting hugo document to micropub format %o', hugo);
  const { frontMatter, content } = hugo;

  let properties = {
    content: content,
    name: [frontMatter.title],
    published: [frontMatter.date],
    category: frontMatter.tags,
    'post-type': [frontMatter.post_type]
  };

  let additionalPropertyKeys = Object.keys(frontMatter).filter(key => !['title', 'date', 'slug', 'tags', 'type', 'post_type'].includes(key));
  logger.debug('Additional property keys %o', additionalPropertyKeys);

  // get values of additional properties and add them as key/values to the front matter
  let additionalProperties = {};
  additionalPropertyKeys.forEach(key => {
    additionalProperties[key] = frontMatter[key];
  });
  logger.debug('Additional properties %o', additionalPropertyKeys);

  properties = {
    ...properties,
    ...additionalProperties
  };

  return {
    type: ['h-entry'],
    properties
  };
};

const getPostType = (properties) => {
  let type = 'note';
  // If a title is set, it's a post
  if (properties.name && properties.name.length && properties.name[0].length) {
    type = 'article';
  }
  if (properties['like-of']) {
    type = 'like';
  }
  if (properties['repost-of']) {
    type = 'repost';
  }
  if (properties['in-reply-to']) {
    type = 'reply';
  }
  if (properties['bookmark-of']) {
    type = 'bookmark';
  }
  if (properties['quotation-of']) {
    type = 'quotation';
  }
  if (properties['photo']) {
    type = 'photo';
  }
  if (properties['video']) {
    type = 'video';
  }
  if (properties['audio']) {
    type = 'audio';
  }

  return type;
}

const addReplyToFrontMatter = (hugo, properties) => {
  if (properties['in-reply-to']) {
    hugo.frontMatter.reply_to_url = properties['in-reply-to'][0];
    hugo.frontMatter.reply_to_hostname = new URL(properties['in-reply-to'][0]).hostname;
  }
}

const transformPhotosInFrontMatter = (hugo, properties) => {

  // Rename photo to photos
  if (hugo.frontMatter.photo) {
    hugo.frontMatter.photos = hugo.frontMatter.photo;
    delete hugo.frontMatter.photo;
  }

  // Ensure photos is an array
  if (hugo.frontMatter.photos && !Array.isArray(hugo.frontMatter.photos)) {
    hugo.frontMatter.photos = [hugo.frontMatter.photos];
  }

  if (hugo.frontMatter.photos) {    
    hugo.frontMatter.photos = hugo.frontMatter.photos.map(photo => {
      let url = typeof photo === 'string' ? photo : photo.value;       
      return url;
    });
    hugo.frontMatter.photos_alt = hugo.frontMatter.photos.map(photo => {      
      let alt = typeof photo === 'string' ? '' : photo.alt;      
      return alt;      
    });
    console.log(hugo.frontMatter);
  }  
}

const addPhotosInFrontMatterToContent = (hugo, properties) => {
  // Insert photos into content
  if (hugo.frontMatter.photos) {
    hugo.frontMatter.photos.forEach(photo => {
      let url = typeof photo === 'string' ? photo : null;
      let alt = hugo.frontMatter.photos_alt.length >= hugo.frontMatter.photos.indexOf(photo) 
      ? hugo.frontMatter.photos_alt[hugo.frontMatter.photos.indexOf(photo)]
      : '';
      if(url) {
        hugo.content += `\n\n![${alt}](${url})`;
      }
    });
  }
}

module.exports = {
  processJsonEncodedBody,
  processFormEncodedBody,
  micropubDocumentToHugo,
  sendWebmentions,
  hugoToMicropubDocument
};