const kleur = require("kleur")

const getServerPID = (cfg) => {
  const usedCfg = cfg.modifiers.global ? cfg.global : cfg.local
  if (usedCfg.server_pid) {
    console.log(kleur.green(`API server PID: ${usedCfg.server_pid}`))
  } else {
    console.log(kleur.yellow("API server is not running!"))
  }
}

module.exports = getServerPID
