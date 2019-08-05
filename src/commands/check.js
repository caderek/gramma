const kleur = require("kleur")
const fs = require("fs")
const checkNonInteractively = require("../actions/checkNonInteractively")
const checkInteractively = require("../actions/checkInteractively")
const save = require("../actions/save")

const check = async (argv, cfg) => {
  if (!argv.file) {
    console.log(kleur.red("Please provide a file path."))
    process.exit(1)
  }

  if (!fs.existsSync(argv.file)) {
    console.log(kleur.red("There is no such file!"))
    process.exit(1)
  }

  const initialText = fs.readFileSync(argv.file).toString()

  if (argv.print) {
    const status = await checkNonInteractively(initialText, cfg.session)
    process.exit(status)
  } else {
    const { changed, text } = await checkInteractively(initialText, cfg.session)
    if (changed) {
      await save(text, "FILE", argv.file)
    }
    process.exit()
  }
}

module.exports = check
