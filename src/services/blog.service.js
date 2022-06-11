const httpStatus = require('http-status');
const db = require('../db/models');
const ApiError = require('../utils/ApiError');

const getBlog = async(id = 1) => {
  let blog = await db.Blog.findByPk(id);
  if (!blog) {
    const blogObject = {
      title: 'My Blog',
      email: 'brandontreb@gmail.com',
      password: 'tr4v15',
      homepage_content: '# Welcome to my spore.blog\nChange this content in the dashboard.',
      meta_description: 'A new blog for my spore.blog',
      language: 'en'
    }
    blog = await db.Blog.create(blogObject);
  }
  return blog;
}

const updateBlog = async(body, id = 1) => {
  let blog = await getBlog(id);
  blog = await blog.update(body);
  return blog;
}

module.exports = {
  getBlog,
  updateBlog
}