const catchAsync = require('../utils/catchAsync');
const { blogService, postService } = require('../services');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const getBlog = catchAsync(async(req, res) => {
  let blog = await blogService.getBlog();  
  res.render('pages/index', {
    title: blog.title,
    blog,
  });
});

const getPosts = catchAsync(async(req, res) => {
  let blog = await blogService.getBlog();
  let filter = {};

  let q = req.query.q || '';
  if (q && typeof q === 'string') {
    filter = {
      [Op.or]: [{
          title: {
            [Op.like]: `%${q}%`
          }
        },
        {
          content: {
            [Op.like]: `%${q}%`
          }
        },
        {
          tags: {
            [Op.like]: `%${q}%`
          }
        }
      ]
    }
  }

  filter = {
    [Op.and]: [{
        published: true,
        is_page: false
      },
      filter
    ]
  }

  console.log(filter);

  let posts = await postService.queryPosts(filter, {
    order: [
      ['published_date', 'DESC']
    ]
  });
  res.render('pages/blog', {
    title: `Posts | ${blog.title}`,
    posts,
    blog
  });
});

const getPost = catchAsync(async(req, res) => {
  let blog = await blogService.getBlog();
  let post = await postService.getPostByPermalink(req.params.permalink);

  // If the post is not published, redirect to the blog page
  if (!post || !post.published) {
    return res.render('pages/404', {
      title: blog.title,
      blog,
    });
  }

  post.tags = post.tags.split(',');

  res.render('pages/post', {
    blog,
    post,
    title: post.title,
  });
});

module.exports = {
  getBlog,
  getPost,
  getPosts
}