const execSync = require('child_process').execSync;
const YAML = require('yaml');
const fs = require('fs');
const markdownLinkExtractor = require('markdown-link-extractor');

const logger = require('../config/logger');
const config = require('../config/config');

// front matter, content, and slug
const createPost = (frontMatter, content) => {
  // Generate a slug if one is not provided
  if (!frontMatter.slug) {
    throw new Error('frontMatter.slug is required');
  }

  // Filter null keys
  frontMatter = Object.keys(frontMatter).reduce((filtered, key) => {
    if (frontMatter[key] !== null) filtered[key] = frontMatter[key];
    return filtered;
  }, {});

  logger.debug('Front Matter: %o', frontMatter);

  const postContent = `---\n${YAML.stringify(frontMatter)}---\n${content}`;
  logger.debug('Creating Post: \n%s', postContent);
  // Write the post to disk
  let folder = 'posts';
  if (frontMatter.post_type === 'reply') {
    folder = 'replies';
  }
  fs.writeFileSync(`data/hugo/content/${folder}/${frontMatter.slug}.md`, postContent, 'utf8');
  // Return the slug
  return frontMatter.slug;
}

const generateSite = () => {
  // Run hugo to generate the static site
  logger.debug('Generating site');
  logger.debug('hugo --source data/hugo');
  // Generate the site
  const result = execSync(`hugo --source data/hugo`);
  logger.debug(result.toString('utf-8')); 
  return result;
}

const getPostUrl = (frontMatter) => {
  // Generate the url to the post using the date and slug
  let date = new Date(frontMatter.date);
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  if(month <= 9)
    month = '0'+month;
  let day = date.getDate();
  if(day <= 9)
    day = '0'+day;
  let dateString = `${year}/${month}/${day}`;
  // If this is a reply, add the replies/ prefix to the url
  let reply = frontMatter.reply_to_url ? 'replies/' : '';
  // Generate the url
  return `${config.hugo.config.baseURL}/${reply}${dateString}/${frontMatter.slug}/`;    
}

const getLinksFromFrontMatterAndContent = (frontMatter, content) => {
  let links = [];  
  // Check if any of the front matter properties are links
  Object.keys(frontMatter).forEach(key => {
    if (frontMatter[key] && frontMatter[key].length && frontMatter[key].includes('http')) {
      links.push(frontMatter[key]);
    }
  });
  // Get links from the content  
  const { links: contentLinks } = markdownLinkExtractor(content);
  links = links.concat(contentLinks);
  // Remove duplicates
  links = [...new Set(links)];
  // Remove null and undefined
  links = links.filter(link => link !== null && link !== undefined);
  logger.debug('Links found in front matter and content: %o', links);
  return links;
};

module.exports = {
  createPost,
  generateSite,
  getPostUrl,
  getLinksFromFrontMatterAndContent
};

