const axios = require('axios').default;
const fs = require('fs');

const download = async (url, path) => {
  try {
    let response = await axios({
      method: "get",
      url: url,
      responseType: "stream"
    });
    response.data.pipe(fs.createWriteStream(path));       
    
    let media = {
      type: 'image',
      mimetype: response.headers['content-type'],
      size: response.headers['content-length'],
      originalname: path.split('/').pop(),
      filename: path.split('/').pop(),
      path: path
    }
    return media;
  } catch (err) {
    console.log(err);
  }
};

const downloadMediaFile = async (url) => {
  if(!url || typeof url !== 'string') {    
    return null;
  }
  
  let fileName = url.split('/').pop();
  let path = `${__dirname}/../../content/uploads/${fileName}`;

  try {
    return await download(
      url,
      `${path}`
    );
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  downloadMediaFile,
}