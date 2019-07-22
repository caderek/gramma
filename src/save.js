const handleSave = require("./prompts/handleSave")
const path = require("path")
const fs = require("fs")

const save = async (text, mode, filePath = null) => {
  const originalFile = filePath ? path.basename(filePath) : null
  const originalFolder = filePath ? path.dirname(filePath) : "."

  console.clear()
  console.log("All mistakes fixed!")
  const { saveOption, fileName } = await handleSave(mode, originalFile)

  if (saveOption === "replace") {
    fs.writeFileSync(filePath, text)
    console.clear()
    console.log(`-----------------------\n\nSaved in ${path.resolve(filePath)}`)
  } else if (saveOption === "save-as") {
    const newPath = path.join(originalFolder, fileName)
    fs.writeFileSync(newPath, text)
    console.clear()
    console.log(`-----------------------\n\nSaved in ${path.resolve(newPath)}`)
  } else {
    console.clear()
    console.log(
      `-----------------------\n\n${text}\n\n-----------------------\nDone!`,
    )
  }
}

module.exports = save
