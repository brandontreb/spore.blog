const catchAsync = require('../../utils/catchAsync');
const {userService} = require('../../services');

const getAccount = catchAsync(async(req, res) => {
  let user = await userService.getUser(req.user.id);
  res.render('dashboard/pages/account', {
    user,
    dash_title: 'Account',
  });
});

const updateAccount = catchAsync(async(req, res) => {
  let body = req.body;  
  let user = req.user;

  if(body.password && body.password !== body.password_confirm) {
    req.flash('error', 'Passwords do not match');
    res.redirect('/dashboard/account');
    return;
  }

  if(!body.password) {
    delete body.password;
    delete body.password_confirm;
  }

  await userService.updateUser(user.id,body);
  res.redirect('/dashboard/account');
});

const getPhoto = catchAsync(async(req, res) => {
  let user = req.user;
  res.render('dashboard/pages/photo', {
    user,
    dash_title: 'Profile Photo',
  });
});


module.exports = {
  getAccount,
  updateAccount,
  getPhoto
}