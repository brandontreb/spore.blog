const urlSlug = require('url-slug');
const db = require('../db/models');

const queryMedia = async(filter, options) => {
  let media = await db.Media.findAll({
    where: filter,
    ...options,
  });
  return media;
};

const getMediaById = async(id) => {
  let media = await db.Media.findOne({
    where: {
      id,
    },
  });
  return media;
}

const createMedia = async(body) => {      
  media = await db.Media.create(body);
  return media;
}

const deleteMedia = async(id) => {
  let media = await db.Media.findByPk(id);  

  // Delete the media file from disk
  const fs = require('fs');
  const path = require('path');
  const mediaPath = path.join(media.path);
  const filePath = path.join(mediaPath, media.path);
  fs.unlink(filePath, (err) => {
    if (err) {
      console.log(err);
    }
  });

  media = await media.destroy();

  return media;
}

module.exports = {
  queryMedia,
  getMediaById,
  createMedia,
  deleteMedia,
}