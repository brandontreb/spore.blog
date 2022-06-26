const db = require('../db/models');
const MarkdownIt = require('markdown-it');
const md = new MarkdownIt();

const getBlog = async (include=[]) => {
  try {
    let blog = await db.Blogs.findOne({
      order: [
        ['id', 'DESC']
      ],
      include: include
    });
    return blog;
  } catch (err) {
    console.log(err);
  }
  return null;
}

const createBlog = async (body) => {
  let blog = await db.Blogs.create(body);
  return blog;
}

const updateBlog = async (body, id = 1) => {
  let blog = await getBlog(id);
  if (body.homepage_content) {
    body.homepage_content_html = md.render(body.homepage_content);
  }
  if (body.password) {
    body.password = await hashPassword(body.password);
  }

  console.log(body);

  blog = await blog.update(body);
  return blog;
}

module.exports = {
  getBlog,
  createBlog,
  updateBlog,  
}