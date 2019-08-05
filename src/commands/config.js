const configure = require("../actions/configure")

const config = async (argv, cfg) => {
  configure(argv.key, argv.value, cfg, argv.global)
  console.log("Done!")
}

module.exports = config
