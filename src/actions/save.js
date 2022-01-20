const path = require("path")
const fs = require("fs")
const kleur = require("kleur")
const clipboard = require('clipboardy');
const { homedir } = require("os")
const handleSave = require("../prompts/handleSave")

const save = async (text, mode, filePath = null) => {
  const originalFile = filePath ? path.basename(filePath) : null

  console.clear()
  console.log("All mistakes fixed!")
  const { saveOption, fileName } = await handleSave(mode, originalFile)

  if (saveOption === "replace") {
    fs.writeFileSync(filePath, text)
    console.clear()
    console.log(kleur.green("Saved!"))
  } else if (saveOption === "save-as") {
    const resolvedFileName = fileName.replace("~", homedir())
    const newPath = path.resolve(process.cwd(), resolvedFileName)

    fs.writeFileSync(newPath, text)

    console.clear()
    console.log(kleur.green(`Saved as ${newPath}`))
  } else if (saveOption === "copy-cb") {
    clipboard.writeSync(text);

    console.clear()
    console.log(kleur.green("Copied to clipboard!"))
  } else {
    console.clear()
    console.log(
      `---------------------------------\n\n${text}\n\n---------------------------------\n${kleur.green(
        "Done!",
      )}`,
    )
  }
}

module.exports = save
