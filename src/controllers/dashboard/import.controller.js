const catchAsync = require('../../utils/catchAsync');
const AdmZip = require("adm-zip");
const fm = require('front-matter');
const moment = require('moment');
const {postService, importService} = require('../../services');

const index = catchAsync(async (req, res) => {
  res.render('dashboard/pages/import', {
    dash_title: 'Import',
  });
});

const markdown = catchAsync(async (req, res) => {
  let blog = req.blog;
  let user = req.user;
  let file = req.file;
  let zip = new AdmZip(file.buffer);
  let zipEntries = zip.getEntries();
  zipEntries.forEach(async (zipEntry) => {
    //do stuff
    let name = zipEntry.entryName;
    let content = zipEntry.getData().toString("utf8");
    let frontMatter = fm(content);

    let title = frontMatter.attributes.title;
    let published = frontMatter.attributes.date;
    if(!published) {
      // Check if name contains a date in the format yyyy-mm-dd
      let date = name.match(/\d{4}-\d{2}-\d{2}/);
      if(date) {
        published = date[0];
      }      
    }
    
    let postTags = frontMatter.attributes.tags;
    let postCategories = frontMatter.attributes.categories;

    if(typeof frontMatter.attributes.tags === 'array') {
      postTags = frontMatter.attributes.tags.join(',');
    }

    if(typeof frontMatter.attributes.categories === 'array') {
      postCategories = frontMatter.attributes.categories.join(',');
    }

    if(typeof frontMatter.attributes.categories === 'object'){
      postCategories = Object.values(frontMatter.attributes.categories).join(',');
    }
    if(typeof frontMatter.attributes.tags === 'object'){
      postTags = Object.values(frontMatter.attributes.tags).join(',');
    }
    let tags = [
      postTags ? postTags.split(',').map(tag => tag.trim()) : "",
      postCategories ? postCategories.split(',').map(category => category.trim()) : ""
    ];
    // remove empty tags
    tags = tags.filter(t => t !== '')
    tags = tags.join(',');

    let slug = frontMatter.attributes.slug;
    let permalink = frontMatter.attributes.permalink;

    if(!slug) {
      slug = permalink;
    }

    if(!permalink) {
      permalink = slug;
    }

    let postContent = frontMatter.body;

    let postObject = {
      title: title,
      published_date: moment(published),
      tags: tags,
      slug: slug,
      permalink: permalink,
      content: postContent,
      blog_id: blog.id,
      user_id: 1 // todo: look up from user
    };

    let post;
    try {
      post = await postService.createPost(postObject);  
    } catch(err) {
      console.log(err);
      return;
    }
    
    // Download the media files
    let photo = frontMatter.attributes['mf-photo'];
    if(photo) {
      let media = await importService.downloadMediaFile(photo[0]);           
      const pathRegex = new RegExp(/\.\.\/\.\.\/(.*)/, "g");
      const match = pathRegex.exec(media.path);          
      if(media) {
        media.path = match[1];
        media.post_id = post.id;
        console.log(media);
        await postService.associateMediaFilesWithPost(post, [media]);
      }
    }    

  });
  res.send('ok');
});

module.exports = {
  index,
  markdown
}