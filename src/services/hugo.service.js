const {execSync} = require('child_process')
const YAML = require('yaml');
const fs = require('fs');
const markdownLinkExtractor = require('markdown-link-extractor');

const logger = require('../config/logger');
const config = require('../config/config');

const folderForPostType = (post_type = 'post') => {  
  switch(post_type) {
    case 'reply':
      return 'replies';
    case 'page':
      return 'pages';
    case 'redirect':
      return 'redirects';
    default:
      return 'posts';
  }
}

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
  let folder = folderForPostType(frontMatter.post_type);

  // Make sure the folder exists
  let directory = `${config.hugo.contentDir}/${folder}`;
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory);
  }

  fs.writeFileSync(`${directory}/${frontMatter.slug}.md`, postContent, 'utf8');
  // Return the slug
  return frontMatter.slug;
}

const deletePost = (slug, post_type = 'post') => {
  // Delete the post from disk
  let folder = folderForPostType(post_type);
  logger.debug('Deleting Post: %s', slug);
  fs.unlinkSync(`${config.hugo.contentDir}/${folder}/${slug}.md`);
}

const getPosts = (post_type) => {
  // Get all posts from disk
  let folder = folderForPostType(post_type);
  logger.debug('Getting Posts: %s', folder);

  let posts = [];

  // Get all the files in the folder
  try {
    posts = fs.readdirSync(`${config.hugo.contentDir}/${folder}`);    
    // Get the front matter for each file
    posts = posts.map((post) => {
      let slug = post.replace('.md', '');
      return getPostBySlug(slug, post_type);
    });

  } catch (error) {
    logger.error(error);
    return posts;
  }

  return posts;
}

const generateSite = async () => {
  // Run hugo to generate the static site
  logger.debug('Generating site');  
  // Generate the site
  return new Promise(async (resolve, reject) => {
    try {        
      await copyConfig();
      const result =  execSync(`hugo --source data/hugo --cleanDestinationDir`);
      logger.debug(`hugo --source data/hugo`);
      // logger.debug(`${JSON.stringify(result)}`); 
      // console.log(result.stdout)      
      console.log(result.toString('utf8'));
      resolve(true);
    } catch (error) {
      logger.error(error);
      // reject(error);
    }
  });
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

const getPostBySlug = (slug, post_type = 'post') => {

  let folder = folderForPostType(post_type);

  // Get the post by slug
  logger.debug('Getting post by slug: %s', slug);
  // Read the post from disk
  const post = fs.readFileSync(`${config.hugo.contentDir}/${folder}/${slug}.md`, 'utf8');
  // Split the front matter and content
  const [frontMatter, content] = post.split('---').filter(Boolean);
  // Parse the front matter
  const parsedFrontMatter = YAML.parse(frontMatter);
  parsedFrontMatter.slug = frontMatter.slug || slug;
  // Return the front matter and content
  return {
    frontMatter: parsedFrontMatter,
    content
  };
}

const updatePost = (frontMatter, content, post_type = 'post') => {
  // Update the post
  logger.debug('Updating post: %s', frontMatter.slug);
  // Delete the post
  deletePost(frontMatter.slug, post_type);
  // Create the post
  createPost(frontMatter, content);
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

const getConfig = () => {
  // Get the config from disk
  logger.debug('Getting config');  
  const hugo = config.hugo.config;
  return hugo;
}

const updateConfig = async (config) => {
  // Update the config
  logger.debug('Updating config %o', config);
  // Get the current config  
  let hugo = getConfig();
  // Merge the new config with the current config
  config = Object.assign(hugo, config);
  // Write the config to disk
  fs.writeFileSync('hugo/config.json', JSON.stringify(config, null, 2), 'utf8');  
  await copyConfig();
  return getConfig();
}

const copyConfig = () => {
  return;
  // Copy the config from the hugo folder to the data folder
  logger.debug('Copying config');
  // Delete admin section from config
  let hugo = getConfig();
  delete hugo.admin;
  fs.writeFileSync('data/hugo/config.json', JSON.stringify(hugo, null, 2), 'utf8');
}

module.exports = {
  createPost,
  deletePost,
  generateSite,
  getPostUrl,
  updatePost,
  getLinksFromFrontMatterAndContent,
  getPostBySlug,
  getConfig,
  updateConfig,
  getPosts
};

