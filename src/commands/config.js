const kleur = require("kleur")
const configure = require("../actions/configure")
const confirmConfig = require("../prompts/confirmConfig")

const config = async (argv, cfg) => {
  if (!argv.global && !cfg.paths.localConfigFile) {
    const { useGlobal } = await confirmConfig()

    if (useGlobal) {
      argv.global = true // eslint-disable-line
    } else {
      console.log(kleur.yellow("Aborting"))
      process.exit()
    }
  }

  configure(argv.key, argv.value, cfg, argv.global)
  console.log(kleur.green("Done!"))
}

module.exports = config
