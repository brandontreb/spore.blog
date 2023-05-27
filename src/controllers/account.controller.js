const catchAsync = require('../utils/catchAsync');
const {hugoService} = require('../services');
const utils = require('../utils/utils');
const logger = require('../config/logger');

const update = catchAsync(async(req, res) => {
  let author = req.body;
  delete author.password_again;
  delete author.password;  

  let hugo = hugoService.getConfig();
  let existingEmail = hugo.Author.email;
  Object.assign(hugo.Author, author);

  // Update avatar if needed  
  if(!hugo.Author.avatar ||  
    (!hugo.Author.avatar && existingEmail !== hugo.Author.email) ) {
    hugo.Author.avatar = utils.gravatarUrl(hugo.Author.email);
  }
  
  await hugoService.updateConfig({
    Author: hugo.Author,
  });

  hugoService.generateSite();
  
  req.flash('success', 'Account updated successfully, regenerating site...');
  res.redirect('/admin/account');
});

const index = catchAsync(async(req, res) => {
  const hugo = hugoService.getConfig();
  console.log('hugo', hugo);
  res.render('admin/account', {
    admin_title: 'account',
    hugo,
  });
});

const getPhoto = catchAsync(async(req, res) => {
  let hugo = hugoService.getConfig();
  res.render('admin/photo', {
    hugo,
    admin_title: 'profile photo',
  });
});

const updatePhoto = catchAsync(async(req, res) => {
  logger.debug('req.file %o', req.file);
  // update the avatar in the config
  let hugo = hugoService.getConfig();
  hugo.Author.avatar = `${hugo.baseURL}/${req.file.filename}`;

  utils.generateFaviconFromFile(req.file.path);
  
  await hugoService.updateConfig({
    Author: hugo.Author,
  });

  hugoService.generateSite();
  
  req.flash('success', 'Profile photo updated successfully, regenerating site...');
  res.redirect('/admin/account');
});


module.exports = {
  update,
  index,
  getPhoto,
  updatePhoto,
};