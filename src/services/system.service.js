const fs = require('fs-extra');
const path = require('path');
const logger = require('../config/logger');

const isInstalled = () => {
  // check if hugo/config file exists 
  return fs.existsSync('data/hugo/config.json');
};

const install = async () => {
  console.log('Installing...');
  // create data/hugo directory
  const hugoDataPath = path.join(__dirname, '../../data/hugo');
  fs.mkdirSync(hugoDataPath, { recursive: true });
  // copy hugo/config.json.example to data/hugo/config.json
  const hugoConfigPath = path.join(__dirname, '../../data/hugo/config.json');
  const hugoConfigSrcPath = path.join(__dirname, '../../hugo/config.json.example');
  logger.debug(`Copying ${hugoConfigSrcPath} to ${hugoConfigPath}`);
  fs.copySync(hugoConfigSrcPath, hugoConfigPath);
  // copy hugo/themes to data/hugo/themes
  const hugoThemesPath = path.join(__dirname, '../../data/hugo/themes');  
  const hugoThemesSrcPath = path.join(__dirname, '../../hugo/themes');
  fs.copySync(hugoThemesSrcPath, hugoThemesPath);
  // copy hugo/static to data/hugo/static
  const hugoStaticPath = path.join(__dirname, '../../data/hugo/static');  
  const hugoStaticSrcPath = path.join(__dirname, '../../hugo/static');
  fs.copySync(hugoStaticSrcPath, hugoStaticPath);
  // copy hugo/content to data/hugo/content
  const hugoContentPath = path.join(__dirname, '../../data/hugo/content');  
  const hugoContentSrcPath = path.join(__dirname, '../../hugo/content');
  fs.copySync(hugoContentSrcPath, hugoContentPath);

  // Copy the contents from hugo/themes/theme-blank to all of the theme folders inside of data/hugo/themes
  const themeBlankPath = path.join(__dirname, '../../hugo/themes/theme-blank');
  const themeFolders = fs.readdirSync(hugoThemesPath);  
  themeFolders.forEach((themeFolder) => {
    const themePath = path.join(hugoThemesPath, themeFolder);    
    fs.copySync(themeBlankPath, themePath, { overwrite: false });
  }
  );
  logger.debug('Installation complete');
};

module.exports = {
  isInstalled,
  install
};