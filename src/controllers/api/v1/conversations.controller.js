const catchAsync = require('../../../utils/catchAsync');
const httpStatus = require('http-status');
const { indiewebService, postService } = require('../../../services');
const ApiError = require('../../../utils/ApiError');

const getConversation = catchAsync(async (req, res, next) => {
  const { permalink } = req.query;  
  if (!permalink) {    
    throw new ApiError(httpStatus.BAD_REQUEST, 'No permalink found');
  }

  let post = await postService.getPostByPermalink(permalink);

  if (!post) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Post not found');
  }

  // Get Webmentions
  const webmentions = await indiewebService.queryWebmentions({
    target: post.url,
  },
    {
      limit: 100,
      order: [
        ['createdAt', 'DESC']
      ]
    }
  );

  res.send(webmentions);

  // Future: Get Inbox comments

  // Future: Get Direct comments 

});

module.exports = {
  getConversation,
};
