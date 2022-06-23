const bcrypt = require("bcrypt");
const db = require('../db/models');
const MarkdownIt = require('markdown-it');
const md = new MarkdownIt();

const getBlog = async(id = 1) => {
  let blog = await db.Blogs.findByPk(id);
  if (!blog) {
    const blogObject = {
      title: 'My Blog',
      email: 'brandontreb@gmail.com',
      password: hashPassword('password'),
      homepage_content: '# Welcome to my spore.blog\n\nChange this content in the dashboard.',
      homepage_content_html: '<h1> Welcome to my spore.blog</h1><p>Change this content in the dashboard.</p>',
      meta_description: 'A new blog for my spore.blog',
      language: 'en',
      nav: '[Home](/)\n[Blog](/blog/)',
      nav_html: '<a href="/">Home</a>\n<a href="/blog/">Blog</a>',
      favicon: '🌱',
    }
    blog = await db.Blogs.create(blogObject);
  }
  return blog;
}

const updateBlog = async(body, id = 1) => {
  let blog = await getBlog(id);
  if(body.homepage_content) {
    body.homepage_content_html = md.render(body.homepage_content);
  }
  if(body.password) {
    body.password = await hashPassword(body.password);
  }

  console.log(body);

  blog = await blog.update(body);
  return blog;
}

const hashPassword = (password) => {
  return bcrypt.hash(password, bcrypt.genSaltSync(8));
}

const comparePassword = (password, passwordHash) => {
  return bcrypt.compare(password, passwordHash);
}

module.exports = {
  getBlog,
  updateBlog,
  hashPassword,
  comparePassword
}