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

  module.exports = {
    slugify,
    randomStringOfLength,
    decodeHTMLEntities,
    hostnameFromUrl
  }