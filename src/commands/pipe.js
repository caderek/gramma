const kleur = require("kleur")
const intercept = require("intercept-stdout")
const checkNonInteractively = require("../actions/checkNonInteractively")
const stripStyles = require("../utils/stripStyles")

const pipe = async (argv, cfg) => {
  if (argv._.length > 0) {
    console.log(kleur.red("There is no such command!"))
    process.exit(1)
  }

  const text = await new Promise((resolve) => {
    process.stdin.on("data", resolve)
  })

  const initialText = text.toString()

  intercept(stripStyles)
  const status = await checkNonInteractively(initialText, cfg, false)
  process.exit(status)
}

module.exports = pipe
