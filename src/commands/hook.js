const kleur = require("kleur")
const fs = require("fs")
const checkInteractively = require("../actions/checkInteractively")
const saveNow = require("../actions/saveNow")

const hookCode = `hook code 4`

console.log(hookCode)

const hook = async (argv, cfg) => {
  if (!argv.file) {
    console.log(kleur.red("Please provide a file path."))
    process.exit(1)
  }

  if (!fs.existsSync(argv.file) || argv.file === "." || argv.file === "..") {
    console.log(kleur.red("There is no such file!"))
    process.exit(1)
  }

  const initialText = fs.readFileSync(argv.file).toString()

  const { changed, text } = await checkInteractively(initialText, cfg)

  if (changed) {
    await saveNow(text, argv.file)
  }

  process.exit()
}

module.exports = hook
