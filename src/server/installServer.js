const path = require("path")
const fs = require("fs")
const kleur = require("kleur")
const rimraf = require("rimraf")
const downloadFile = require("../utils/downloadFile")
const unzipFile = require("../utils/unzipFile")
const configure = require("../actions/configure")
const confirmServerReinstall = require("../prompts/confirmServerReinstall")

const installServer = async (cfg) => {
  const serverDir = path.join(cfg.paths.home, ".languagetool")
  const zipPath = path.join(serverDir, "languagetool.zip")

  if (fs.existsSync(serverDir)) {
    const { reinstall } = await confirmServerReinstall()

    if (reinstall) {
      rimraf.sync(serverDir)
    } else {
      console.log("Aborting!")
      process.exit()
    }
  }

  fs.mkdirSync(serverDir)

  await downloadFile(
    "https://languagetool.org/download/LanguageTool-stable.zip",
    zipPath,
  )

  console.log("Unpacking...")

  await unzipFile(zipPath, serverDir)

  rimraf.sync(zipPath)

  console.log("Configuring...")

  const [unpackedDirName] = fs.readdirSync(serverDir)
  const serverPath = path.join(serverDir, unpackedDirName)

  configure("server_path", serverPath, cfg, true, true)
  configure("api_url", "localhost", cfg, true, true)

  console.log(kleur.green(`Server installed in: ${serverDir}`))
}

module.exports = installServer
