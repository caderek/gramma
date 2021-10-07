const path = require("path")
const fs = require("fs")

const binDir = path.dirname(process.execPath)
const scriptDir = __dirname

let appLocation

if (scriptDir.includes("snapshot")) {
  const executable = fs.readdirSync(binDir)[0]
  appLocation = path.resolve(binDir, executable)
} else {
  appLocation = path.resolve(scriptDir, "..", "cli.js")
}

module.exports = appLocation
