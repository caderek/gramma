const kleur = require("kleur")
const config = require("../config")

const getServerPID = (isGlobal) => {
  const cfg = isGlobal ? config.global : config.local
  if (cfg.server_pid) {
    console.log(kleur.green(`API server PID: ${cfg.server_pid}`))
  } else {
    console.log(kleur.yellow("API server is not running!"))
  }
}

module.exports = getServerPID
