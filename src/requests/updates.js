const fs = require("fs")
const path = require("path")
const kleur = require("kleur")
const fetch = require("node-fetch")
const { version } = require("../../package.json")

const checkForUpdates = async (configDir) => {
  const updateFile = path.join(configDir, ".update")

  if (fs.existsSync(updateFile)) {
    const lastCheck = Number(fs.readFileSync(updateFile).toString())
    const fullDay = 24 * 60 * 60 * 1000

    if (Date.now() - lastCheck < fullDay) {
      return { available: false }
    }
  }

  const timeout = () => new Promise((_, reject) => setTimeout(reject, 1000))

  try {
    const response = await Promise.race([
      fetch("https://api.github.com/repos/caderek/gramma/releases/latest"),
      timeout(),
    ])
    fs.writeFileSync(updateFile, String(Date.now()))

    const data = await response.json()

    const remoteVersion = data.tag_name
    const [remoteMajor, remoteMinor, remotePatch] = remoteVersion
      .slice(1)
      .split(".")
      .map(Number)
    const [major, minor, patch] = version.split(".").map(Number)

    const oldVersion = major * 1e8 + minor * 1e5 + patch * 1e2
    const newVersion = remoteMajor * 1e8 + remoteMinor * 1e5 + remotePatch * 1e2

    if (newVersion > oldVersion) {
      return { available: true, newVersion: remoteVersion }
    }

    return { available: false }
  } catch (e) {
    return { available: false }
  }
}

const displayUpdates = async (configDir) => {
  const { available, newVersion } = await checkForUpdates(configDir)

  if (available) {
    console.log(
      kleur.yellow(`
Update available: ${newVersion}
Install via NPM or download the new binary from:
https://caderek.github.io/gramma/
`),
    )
  }
}

exports.checkForUpdates = checkForUpdates
exports.displayUpdates = displayUpdates
