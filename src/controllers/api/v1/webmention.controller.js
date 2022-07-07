const catchAsync = require('../../../utils/catchAsync');
const httpStatus = require('http-status');
const { indiewebService } = require('../../../services');
const { http } = require('../../../config/logger');

const webmentionRecieved = catchAsync(async (req, res) => {

  let { source, target } = req.body;

  if (req.method === 'GET') {
    source = req.query.source;
    target = req.query.target;
  }

  try {
    await indiewebService.processWebmention(source, target);
  } catch (err) {
    return res.status(httpStatus.BAD_REQUEST).json({
      status: 'error',
      message: err.message
    });
  }
  
  res.sendStatus(httpStatus.OK);
});

module.exports = {
  webmentionRecieved,
};
