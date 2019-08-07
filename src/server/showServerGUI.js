const { spawn } = require("child_process")
const path = require("path")
const kleur = require("kleur")

const showServerGUI = async (cfg) => {
  if (!cfg.global.server_path) {
    console.log(
      kleur.red(`Please install local server via: gramma server install`),
    )
    return false
  }

  console.log("Starting local server GUI...")

  const command = "java"

  const params = ["-jar", path.join(cfg.global.server_path, "languagetool.jar")]

  const gui = spawn(command, params, { windowsHide: true, detached: true })

  gui.on("error", (error) => {
    if (error) {
      console.log(kleur.red("Cannot start local server GUI automatically."))
      process.exit(1)
    }
  })

  return true
}

module.exports = showServerGUI
