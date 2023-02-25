const moment = require('moment');
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
const processFormEncodedBody = function(body) {
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
const processJsonEncodedBody = function(body) {
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
const cleanEmptyKeys = function(result) {
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

const sendWebmentions = async(source, targets) => {
  if (targets.length === 0) {
    return;
  }
  logger.debug(`Sending webmentions from ${source} to ${targets}`);
  targets.forEach(async(target) => {
    webmention(source, target, `${config.name}/${config.version}`, function(err, obj) {
      if (err) {
        console.log(err);
        return;
      }
      if (obj.success) {
        console.log(`Sending webmention to ${target}. Success!`);
      } else {
        console.log('Failure :(');
      }
    });
  });
}

const micropubDocumentToHugo = (document) => {
  const { properties, mp } = document;  

  let content = properties.content && properties.content[0] ? properties.content[0] : '';
  // check if content is an object, if so, get the html property
  content = typeof content === 'object' ? utils.decodeHTMLEntities(content.html) : content;
  let name = properties.name && properties.name[0] ? properties.name[0] : null;
  let published = properties.published && properties.published[0] ? properties.published[0] : moment().format();
  let category = properties.category && properties.category.length > 0 ? properties.category : null;  
  let slug = mp && mp.slug && mp.slug.length ? mp.slug[0] : utils.slugify(name && name.length ? name : utils.randomStringOfLength(8));    

  return {
    frontMatter: {
      title: name,
      date: published,
      slug: slug,
      tags: category,
      type: 'post',
      post_type: 'note', // TODO: Make this dynamic
    },
    content
  }
};

module.exports = {
  processJsonEncodedBody,
  processFormEncodedBody,    
  micropubDocumentToHugo,
};