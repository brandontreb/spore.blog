const logger = require('../config/logger');
const {hugoService} = require('../services');
const utils = require('../utils/utils');

const getPages = async (req, res) => {
  try {
    const pages = await hugoService.getPosts('page');
    res.render('admin/pages', {
      pages,
      admin_title: 'Pages',
    });
  } catch (error) {
    req.flash('error', error);
    res.redirect('/admin');
  }
}

const getPage = async (req, res) => {
  try {
    const page = await hugoService.getPostBySlug(req.params.slug, 'page');
    res.render('admin/page', {
      page,
      admin_title: 'Page',
    });
  } catch (error) {
    req.flash('error', error);
    res.redirect('/admin');
  }
}

const deletePage = async (req, res) => {
  try {
    await hugoService.deletePost(req.params.slug, 'page');
    req.flash('success', 'Page deleted successfully');
    res.redirect('/admin/pages');
  } catch (error) {
    req.flash('error', error);
    res.redirect('/admin');
  }
}

const updatePage = async (req, res) => {
  let {title, content} = req.body;
  try {
    let page = await hugoService.getPostBySlug(req.params.slug, 'page');   
    page.frontMatter.title = title;    
    await hugoService.updatePost(page.frontMatter, content, 'page');
    hugoService.generateSite();
    req.flash('success', 'Page updated successfully');
    res.redirect(`/admin/pages/${req.params.slug}`);
  } catch (error) {
    logger.error(error);
    req.flash('error', error);
    res.redirect('/admin');
  }
}

const newPage = async (req, res) => {
  try {
    const page = {
      frontMatter: {
        title: '',
        date: new Date(),
        draft: true,
        post_type: 'page',
      },
      content: '',
    }
    res.render('admin/page', {
      page,
      admin_title: 'New Page',
    });
  } catch (error) {
    req.flash('error', error);
    res.redirect('/admin');
  }
}

const createPage = async (req, res) => {
  let {title, content} = req.body;
  let slug = utils.slugify(title);
  try {
    const page = {
      frontMatter: {
        title: title,
        date: new Date(),        
        post_type: 'page',
        slug: slug
      },
      content: content,
    }
    await hugoService.createPost(page.frontMatter, page.content, 'page');
    hugoService.generateSite();
    req.flash('success', 'Page created successfully');
    res.redirect(`/admin/pages/${page.frontMatter.slug}`);
  } catch (error) {
    req.flash('error', error);
    res.redirect('/admin');
  }
}

/*
const createPage = async (req, res) => {
  try {
    const page = await hugoService.createPage(req.body);
    req.flash('success', 'Page created successfully');
    res.redirect(`/admin/pages/${page.id}`);
  } catch (error) {
    req.flash('error', error);
    res.redirect('/admin');
  }
}

const updatePage = async (req, res) => {
  try {
    await hugoService.updatePageById(req.params.pageId, req.body);
    req.flash('success', 'Page updated successfully');
    res.redirect(`/admin/pages/${req.params.pageId}`);
  } catch (error) {
    req.flash('error', error);
    res.redirect('/admin');
  }
}
const newPage = async (req, res) => {
  try {
    res.render('pages/new');
  } catch (error) {
    req.flash('error', error);
    res.redirect('/admin');
  }
}
*/
module.exports = {
  getPages,
  getPage,
  createPage,
  updatePage,
  deletePage,
  newPage,
};