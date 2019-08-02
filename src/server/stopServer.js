const { exec } = require("child_process")
const kleur = require("kleur")
const config = require("../config")
const configure = require("../commands/configure")

const stopServer = async (isGlobal) => {
  const cfg = isGlobal ? config.global : config.local

  if (cfg.server_pid) {
    const command = `kill ${cfg.server_pid}`

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
        configure("server_pid", "", isGlobal)
      })
  }

  console.log(kleur.yellow("API server is not running!"))
  return false
}

module.exports = stopServer
