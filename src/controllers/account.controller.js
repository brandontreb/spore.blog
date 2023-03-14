const catchAsync = require('../utils/catchAsync');
const {hugoService} = require('../services');

const update = catchAsync(async(req, res) => {
  let author = req.body;
  delete author.password_again;
  delete author.password;

  let hugo = hugoService.getConfig();
  Object.assign(hugo.Author, author);

  console.log(hugo.Author)
  hugoService.updateConfig({
    Author: hugo.Author,
  });

  hugoService.generateSite();
  
  req.flash('success', 'Account updated successfully, regenerating site...');
  res.redirect('/admin/account');
});

const read = catchAsync(async(req, res) => {
  const hugo = hugoService.getConfig();
  res.render('admin/account', {
    admin_title: 'Account',
    hugo,
  });
});

module.exports = {
  update,
  read
};