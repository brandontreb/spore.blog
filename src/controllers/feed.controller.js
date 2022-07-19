const catchAsync = require('../utils/catchAsync');
const { blogService, postService } = require('../services');

const xml = catchAsync(async(req, res) => {
  const blog = await blogService.getBlog();
  const posts = await postService.queryPosts({
    published: true,
    is_page: false
  }, {
    order: [
      ['published_date', 'DESC'],
    ],
    limit: 10,
    include: [
      'media',
      'blog'
    ]
  });

  res.setHeader("Content-Type", "application/xml");
  res.render('feeds/xml', {
    blog,
    posts,
  });
});

const json = catchAsync(async(req, res) => {
  const blog = await blogService.getBlog();
  const posts = await postService.queryPosts({
    published: true,
    is_page: false
  }, {
    order: [
      ['published_date', 'DESC'],
    ],
    limit: 10,
    include: [
      'media',
      'blog'
    ]
  });
  
  let response = {
    version: 'https://jsonfeed.org/version/1',
    title: blog.title,
    home_page_url: blog.url,
    feed_url: `${blog.url}/feed.json`
  };
  
  let items = [];
  posts.forEach((post) => {
    let tags = post.tags.length ? post.tags.split(',') : null;
    let item = {
      id: post.url,
      url: post.url,      
      content_html: post.content_html_with_media,
      date_published: post.published_date,
      date_modified: post.updatedAt,      
    };
    if(tags) {
      item.tags = tags;
    }
    if(!post.is_note) {
      item.title = post.title;
    }
    items.push(item);
  });

  response.items = items;
  
  res.setHeader("Content-Type", "application/json");
  res.send(response);

});

module.exports = {
  xml,
  json
}