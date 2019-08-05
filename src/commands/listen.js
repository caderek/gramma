const checkNonInteractively = require("../actions/checkNonInteractively")
const checkInteractively = require("../actions/checkInteractively")
const save = require("../actions/save")

const listen = async (argv, cfg) => {
  if (argv.print) {
    const status = await checkNonInteractively(argv.text, cfg.session)
    process.exit(status)
  } else {
    const { changed, text } = await checkInteractively(argv.text, cfg.session)
    if (changed) {
      await save(text, "TEXT")
    }
    process.exit()
  }
}

module.exports = listen
