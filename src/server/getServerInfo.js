const kleur = require("kleur")

const getServerInfo = (cfg) => {
  if (cfg.global.server_pid) {
    console.log(kleur.green("PID: "), kleur.white(cfg.global.server_pid))
    console.log(kleur.green("Url: "), kleur.white(cfg.global.api_url))
    console.log(kleur.green("Path:"), kleur.white(cfg.global.server_path))
  } else {
    console.log(kleur.yellow("API server is not running!"))
  }
}

module.exports = getServerInfo
