const { exec } = require("child_process")
const kleur = require("kleur")
const { platform } = require("os")
const configure = require("../actions/configure")

const stopServer = async (cfg) => {
  if (cfg.global.server_pid) {
    const command =
      platform() === "win32"
        ? `taskkill /PID ${cfg.global.server_pid} /F`
        : `kill ${cfg.global.server_pid}`

    return new Promise((resolve, reject) => {
      exec(command, (error) => {
        if (error) {
          reject(error)
        } else {
          resolve()
        }
      })
    })
      .then(() => {
        console.log(kleur.green("API server stopped!"))
      })
      .catch(() => {
        console.log(kleur.yellow("API server is not running!"))
      })
      .then(() => {
        configure("server_pid", "", cfg, true, true)
      })
  }

  console.log(kleur.yellow("API server is not running!"))
  return false
}

module.exports = stopServer
