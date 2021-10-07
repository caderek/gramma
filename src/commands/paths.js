const appLocation = require("../utils/appLocation")

const paths = (argv, cfg) => {
  console.log(`Global config: ${cfg.paths.globalConfigFile}`)
  console.log(`App location:  ${appLocation}`)
  console.log(`Local server:  ${cfg.global.server_path || "not installed"}`)
}

module.exports = paths
