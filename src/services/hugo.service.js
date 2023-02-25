const YAML = require('yaml');
const fs = require('fs');
const logger = require('../config/logger');

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

  const postContent = `---\n${YAML.stringify(frontMatter)}---\n${content}`;
  logger.debug('Creating Post: \n%s', postContent);
  // Write the post to the content/posts directory
  fs.writeFileSync(`data/hugo/content/posts/${frontMatter.slug}.md`, postContent, 'utf8');
  // Return the slug
  return frontMatter.slug;
}

const generateSite = () => {
  // Run hugo to generate the static site
  const exec = require('child_process').exec;
  logger.debug('Generating site');
  logger.debug('hugo --source data/hugo');
  // Generate the site
  exec(`hugo --source data/hugo`, (error, stdout, stderr) => {
    if (error) {
      logger.error(error);
      return;
    }
    if (stderr) {
      logger.error(stderr);
      return;
    }
    logger.info(stdout);
  });
}

module.exports = {
  createPost,
  generateSite,
};

