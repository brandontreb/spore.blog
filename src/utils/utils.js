const md5 = require('md5');
const sharp = require('sharp');
const config = require('../config/config');
const slugify = str =>
  str
  .toLowerCase()
  .trim()
  .replace(/[^\w\s-]/g, '')
  .replace(/[\s_-]+/g, '-')
  .replace(/^-+|-+$/g, '');


const randomStringOfLength = length => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

const decodeHTMLEntities = encodedString => {
  var translate_re = /&(nbsp|amp|quot|lt|gt);/g;
  var translate = {
      "nbsp":" ",
      "amp" : "&",
      "quot": "\"",
      "lt"  : "<",
      "gt"  : ">"
  };
  return encodedString.replace(translate_re, function(match, entity) {
      return translate[entity];
  }).replace(/&#(\d+);/gi, function(match, numStr) {
      var num = parseInt(numStr, 10);
      return String.fromCharCode(num);
  });
}

const hostnameFromUrl = url => {
  const hostname = url.replace('https://', '').replace('http://', '').split(/[/?#]/)[0];
  return hostname;
}

const gravatarUrl = email => {
  const hash = md5(email);
  return `https://www.gravatar.com/avatar/${hash}`;
}

const generateFaviconFromFile = file => { 
  return sharp(file)
    .resize(32, 32)
    .png()
    .toFile(`${config.hugo.staticDir}/favicon.png`); 
}

/**
 * Performs a deep merge of `source` into `target`.
 * Mutates `target` only but not its objects and arrays.
 *
 * @author inspired by [jhildenbiddle](https://stackoverflow.com/a/48218209).
 */
const deepMerge = (target, source) => {
  const isObject = (obj) => obj && typeof obj === 'object';

  if (!isObject(target) || !isObject(source)) {
    return source;
  }

  Object.keys(source).forEach(key => {
    const targetValue = target[key];
    const sourceValue = source[key];

    if (Array.isArray(targetValue) && Array.isArray(sourceValue)) {
      target[key] = targetValue.concat(sourceValue);
    } else if (isObject(targetValue) && isObject(sourceValue)) {
      target[key] = deepMerge(Object.assign({}, targetValue), sourceValue);
    } else {
      target[key] = sourceValue;
    }
  });

  return target;
}


const normalizeUrl = (url) => {
  url = url.trim();
  // if url doesn't end with a / add it
  if (url.substr(-1) !== '/') {
    url += '/';
  }
  return url;
}

  module.exports = {
    slugify,
    randomStringOfLength,
    decodeHTMLEntities,
    hostnameFromUrl,
    gravatarUrl,
    generateFaviconFromFile,
    deepMerge,
    normalizeUrl
  }