const kleur = require("kleur")

const getServerPID = (cfg) => {
  if (cfg.global.server_pid) {
    console.log(kleur.green(`API server PID: ${cfg.global.server_pid}`))
  } else {
    console.log(kleur.yellow("API server is not running!"))
  }
}

module.exports = getServerPID
