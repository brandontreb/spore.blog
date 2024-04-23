const simpleGit = require('simple-git');
const fs = require('fs');

const clonePluginAtUrl = async (url) => {
  // git clone into data/plugins/name folder
  try {
    // Get the name of the plugin from the url    
    let pluginName = url.split('/').pop().split('.')[0];
    await simpleGit().clone(url, `data/plugins/${pluginName}`);
    return true;
  } catch (err) {
    console.log(err);
  }
  return false;
}

const getPluginList = async (type = null) => {
  // Get the list of plugins from the data/plugins folder
  // Return an array of objects with the name and url of each plugin  
  let pluginList = [];
  let pluginFolders = await fs.readdirSync('data/plugins');
  for (let i = 0; i < pluginFolders.length; i++) {
    let pluginFolder = pluginFolders[i];
    let plugin = {};

    // check if the folder contains a file called theme.toml
    // if it does, it's a theme, not a plugin
    if (fs.existsSync(`data/plugins/${pluginFolder}/theme.toml`)) {
      plugin.type = 'theme';
    } else {
      plugin.type = 'plugin';
    }
    plugin.name = pluginFolder;
    plugin.url = await getPluginUrl(pluginFolder);
    if(type && plugin.type === type || !type) {
      pluginList.push(plugin);
    }
  }
  return pluginList;
}

const getPluginUrl = async (pluginName) => {
  // Get the url of a plugin from the data/plugins/name folder
  // Return the url as a string
  let pluginFolder = `data/plugins/${pluginName}`;
  let git = simpleGit(pluginFolder);
  let remotes = await git.getRemotes(true);
  let url = remotes[0].refs.fetch;
  return url;
}

module.exports = {
  clonePluginAtUrl,
  getPluginList,
  getPluginUrl
}