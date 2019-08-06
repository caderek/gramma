const fs = require("fs")
const initialConfig = require("../initialConfig")
const { ruleOptions } = require("../validators/rules")

const init = async (argv, cfg) => {
  if (!fs.existsSync(cfg.paths.localConfigFile)) {
    const rules = {}

    ruleOptions.forEach((rule) => {
      rules[rule] = true
    })

    const defaultConfig = {
      ...initialConfig,
      rules,
    }

    const content = JSON.stringify(defaultConfig, null, 2)

    fs.writeFileSync(cfg.paths.localConfigFile, content)
  } else {
    console.log("Gramma config already exists for this project!")
  }
}

module.exports = init
