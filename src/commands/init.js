const fs = require("fs")
const initialConfig = require("../initialConfig")

const init = async (argv, cfg) => {
  if (!fs.existsSync(cfg.paths.localConfigFile)) {
    const content = JSON.stringify(
      { ...initialConfig, api_url: "inherit" },
      null,
      2,
    )

    fs.writeFileSync(cfg.paths.localConfigFile, content)
  } else {
    console.log("Gramma config already exists for this project!")
  }
}

module.exports = init
