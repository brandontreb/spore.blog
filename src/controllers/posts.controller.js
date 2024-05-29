const logger = require('../config/logger');
const {hugoService} = require('../services');
const utils = require('../utils/utils');
const parser = require('parser-front-matter');

const getPosts = async (req, res) => {
  try {
    let { page, limit } = req.query;
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 25;
    const offset = (page - 1) * limit;

    const posts = await hugoService.getPosts('post', 'date', 'desc', limit, offset);    
    res.render('admin/posts', {
      posts,      
      admin_title: 'posts',
      page,
    });
  } catch (error) {
    req.flash('error', error);
    res.redirect('/admin');
  }
}

const stringifyUnquotedKeysAndValues = (obj) => {
  let str = '';
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      str += key + ': ';
      if (typeof value !== 'string') { //key === 'title' || 
        str += JSON.stringify(value); // Quote values for title or non-string types
      } else {
        str += value; // Keep values unquoted for other keys if they're strings
      }      
      str += '\n';
    }
  }  
  str += '';
  return str;
}

const newPost = async (req, res) => {
  try {
    const frontMatter = {
      title: '',
      date: new Date(),
      draft: false,
      type: 'post',
      post_type: 'note',
    }
    const post = {
      frontMatter,
      frontMatterString: stringifyUnquotedKeysAndValues(frontMatter),
      content: '',
    }
    res.render('admin/post', {
      post,
      admin_title: 'new post',
    });
  } catch (error) {
    req.flash('error', error);
    res.redirect('/admin');
  }
}

const createPost = async (req, res) => {
  let {frontMatter, content} = req.body;
  frontMatter =`---\n${frontMatter}\n---\n${content}`

  try {
    let fm = parser.parseSync(frontMatter);
    let slug = utils.slug(fm.title);
    fm.data.slug = slug;
    console.log('res', fm.data);
  } catch (error) {
    console.log('error', error);
    req.flash('error', 'Error creating post');
    res.redirect(`/admin/posts/new`);
  }
  // console.log('frontMatter', frontMatter);
  // let parsed = parser.parse(frontMatter);
  // console.log('parsed', parsed);
  // let slug = utils.slugify(title);
  // try {
  //   const page = {
  //     frontMatter: {
  //       title: title,
  //       date: new Date(),        
  //       post_type: 'page',
  //       slug: slug
  //     },
  //     content: content,
  //   }
  //   await hugoService.createPost(page.frontMatter, page.content, 'page');
  //   hugoService.generateSite();
    req.flash('success', 'Post created successfully');
    res.redirect(`/admin/posts/new`);
  
}


module.exports = {
  getPosts,
  newPost,
  createPost,
};