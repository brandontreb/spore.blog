const catchAsync = require('../../utils/catchAsync');
const MarkdownIt = require('markdown-it');
const md = new MarkdownIt();
const { blogService, authService } = require('../../services');

const getLogin = catchAsync(async (req, res) => {
  let blog = await blogService.getBlog();
  res.render('dashboard/pages/login', {
    blog,
    dash_title: 'Login',
  });
});

const loginWithEmailAndPassword = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const blog = await blogService.getBlog();

  if (blog.email !== email) {
    console.log('email not found');
    req.flash('error', 'Invalid email or password');
    return res.redirect('/dashboard/auth/login');
  }

  const isMatch = await blogService.comparePassword(password, blog.password);
  if (!isMatch) {
    req.flash('error', 'Invalid email or password');
    return res.redirect('/dashboard/auth/login');
  }

  req.session.isLoggedIn = true;
  req.session.save(err => {
    if (err) {
      console.error(err);
      return next(err);
    }
    return res.redirect('/dashboard');
  });
});

const logout = catchAsync(async (req, res, next) => {
  req.session.destroy(err => {
    if (err) {
      console.error(err);
      return next(err);
    }
    return res.redirect('/dashboard/auth/login');
  }
  );
});

module.exports = {
  getLogin,
  loginWithEmailAndPassword,
  logout
}