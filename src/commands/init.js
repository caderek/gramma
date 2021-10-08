const kleur = require("kleur")
const fs = require("fs")
const initialConfig = require("../initialConfig")
const confirmHook = require("../prompts/confirmHook")
const { addHookCode } = require("./hook")

const init = async (argv, cfg) => {
  if (!fs.existsSync(cfg.paths.localConfigFile)) {
    const { hook } = await confirmHook()

    const content = JSON.stringify(
      { ...initialConfig, api_url: "inherit" },
      null,
      2,
    )

    fs.writeFileSync(cfg.paths.localConfigFile, content)
    console.log(kleur.green("Gramma config created!"))

    if (hook) {
      addHookCode(true)
    }
  } else {
    console.log(kleur.red("Gramma config already exists for this project!"))
  }
}

module.exports = init
