const kleur = require("kleur")
const fs = require("fs")
const path = require("path")
const initialConfig = require("../initialConfig")
const confirmInit = require("../prompts/confirmInit")
const { addHookCode, checkGit } = require("./hook")

const localConfigFile = path.join(process.cwd(), ".gramma.json")

const init = async (argv, cfg) => {
  if (!fs.existsSync(cfg.paths.localConfigFile)) {
    const hasGit = checkGit()
    const { hook, api } = await confirmInit(hasGit)

    if (!api) {
      console.log(kleur.yellow("Aborting!"))
      process.exit(1)
    }

    const content = JSON.stringify({ ...initialConfig, api_url: api }, null, 2)

    fs.writeFileSync(localConfigFile, content)
    console.log(kleur.green("Gramma config created!"))

    if (hook) {
      addHookCode(true)
    }
  } else {
    console.log(kleur.red("Gramma config already exists for this project!"))
  }
}

module.exports = init
