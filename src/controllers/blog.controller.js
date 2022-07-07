const catchAsync = require('../utils/catchAsync');
const { blogService, postService } = require('../services');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const getIndex = catchAsync(async(req, res) => {
  let blog = await blogService.getBlog();  
  let posts = await postService.queryPosts({
    [Op.and]: [{
        published: true,
        is_page: false,
        replyTo: null
      }      
    ]
  }, {
    order: [
      ['published_date', 'DESC']
    ],
    include: ['blog','media']
  });
  res.render('pages/index', {
    title: `${blog.title}`,
    posts,
    blog
  });
});

const getArchive = catchAsync(async(req, res) => {
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
        is_page: false,
        replyTo: null
      },
      filter
    ]
  }

  let posts = await postService.queryPosts(filter, {
    order: [
      ['published_date', 'DESC']
    ],
    include: 'blog'
  });
  res.render('pages/archive', {
    title: `Archive | ${blog.title}`,
    posts,
    blog
  });
});

const getPost = catchAsync(async(req, res) => {
  let blog = await blogService.getBlog();
  let post = await postService.getPostBySlug(req.params.slug, ['media', 'blog']);

  // If the post is not published, redirect to the blog page
  if (!post || !post.published) {
    return res.render('pages/404', {
      title: blog.title,
      blog,
    });
  }

  res.render('pages/single', {
    blog,
    post,
    title: post.title,
  });
});

const getReplies = catchAsync(async(req, res) => {
  let blog = await blogService.getBlog();  
  let posts = await postService.queryPosts({
    [Op.and]: [{
        published: true,
        is_page: false,
        replyTo: {[Op.ne]: null}
      }      
    ]
  }, {
    order: [
      ['published_date', 'DESC']
    ],
    include: ['blog','media']
  });
  console.log(posts);
  res.render('pages/replies', {
    title: `Replies | ${blog.title}`,
    posts,
    blog
  });
});

module.exports = {
  getIndex,
  getPost,
  getArchive,
  getReplies
}