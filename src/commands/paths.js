const paths = (argv, cfg) => {
  console.log(`Global config: ${cfg.paths.globalConfigFile}`)
  console.log(`App location:  ${__dirname}`)
  console.log(`Local server:  ${cfg.global.server_path || "not installed"}`)
}

module.exports = paths
