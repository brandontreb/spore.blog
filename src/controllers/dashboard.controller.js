const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');

const getDashboard = catchAsync(async(req, res) => {
  res.render('dashboard/pages/index', {
    title: 'Dashboard',
    homepage_content: 'Dashboard',
  });
});

const updateDashboard = catchAsync(async(req, res) => {
  console.log(req.body);
  res.status(httpStatus.CREATED).send({ success: true });
});

module.exports = {
  getDashboard,
  updateDashboard
}