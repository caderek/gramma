const paths = (argv, cfg) => {
  console.log(`Global config: ${cfg.paths.globalConfigFile}`)
  console.log(`App location:  ${__dirname}`)
}

module.exports = paths
