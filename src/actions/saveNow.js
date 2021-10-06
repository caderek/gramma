const fs = require("fs")

const saveNow = async (text, filePath) => {
  fs.writeFileSync(filePath, text)
  console.clear()
}

module.exports = saveNow
