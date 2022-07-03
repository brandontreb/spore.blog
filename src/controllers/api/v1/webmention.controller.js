const catchAsync = require('../../../utils/catchAsync');
const Sequelize = require('sequelize');
const mfo = require('mf-obj');
const httpStatus = require('http-status');
const URL = require("url").URL;

const stringIsAValidUrl = (s) => {
  try {
    new URL(s);
    return true;
  } catch (err) {
    return false;
  }
};

const webmentionRecieved = catchAsync(async (req, res) => {

  let { source, target } = req.body;

  if (req.method === 'GET') {
    source = req.query.source;
    target = req.query.target;
  }

  // Ensure that source and target are valid urls
  if (!stringIsAValidUrl(source) || !stringIsAValidUrl(target)) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }


  if (!source || !target) {
    return res.status(400).json({
      status: 'error',
      message: 'Missing source or target'
    });
  }

  mfo.getEntry(source)
    .then(entry => {
      console.log(entry);
    });

  res.sendStatus(httpStatus.OK);
});

module.exports = {
  webmentionRecieved,
};
