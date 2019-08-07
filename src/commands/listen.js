const intercept = require("intercept-stdout")
const checkNonInteractively = require("../actions/checkNonInteractively")
const checkInteractively = require("../actions/checkInteractively")
const save = require("../actions/save")
const stripStyles = require("../utils/stripStyles")

const listen = async (argv, cfg) => {
  if (argv.print) {
    const noColors = argv["no-colors"]

    if (noColors) {
      intercept(stripStyles)
    }

    const status = await checkNonInteractively(argv.text, cfg, !noColors)
    process.exit(status)
  } else {
    const { changed, text } = await checkInteractively(argv.text, cfg)
    if (changed) {
      await save(text, "TEXT")
    }
    process.exit()
  }
}

module.exports = listen
