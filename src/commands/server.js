const kleur = require("kleur")
const startServer = require("../server/startServer")
const stopServer = require("../server/stopServer")
const getServerPID = require("../server/getServerPID")

const server = async (argv, cfg) => {
  const availableOptions = ["start", "stop", "pid"]

  if (!availableOptions.includes(argv.action)) {
    console.log(kleur.red("There is no such command!"))
    console.log(
      `Available options for gramma server: ${availableOptions.join(" | ")}`,
    )
    process.exit(1)
  }

  if (argv.action === "start") {
    await startServer(cfg, true)
    process.exit()
  }

  if (argv.action === "stop") {
    await stopServer(cfg)
    process.exit()
  }

  if (argv.action === "pid") {
    getServerPID(cfg)
    process.exit()
  }
}

module.exports = server
