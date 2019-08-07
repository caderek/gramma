const decompress = require("decompress")
const decompressUnzip = require("decompress-unzip")

const unzipFile = (pathToFile, outputFolder) => {
  return decompress(pathToFile, outputFolder, {
    plugins: [decompressUnzip()],
  })
}

module.exports = unzipFile
