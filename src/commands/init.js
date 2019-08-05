const fs = require("fs")

const init = async (argv, cfg) => {
  const localConfig = JSON.stringify(
    {
      dictionary: [],
    },
    null,
    2,
  )
  if (!fs.existsSync(cfg.paths.localConfigFile)) {
    fs.writeFileSync(cfg.paths.localConfigFile, localConfig)
  }
}

module.exports = init
