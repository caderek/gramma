const kleur = require("kleur")
const installServer = require("../server/installServer")
const startServer = require("../server/startServer")
const stopServer = require("../server/stopServer")
const getServerPID = require("../server/getServerPID")
const showServerGUI = require("../server/showServerGUI")

const server = async (argv, cfg) => {
  const availableOptions = ["install", "start", "stop", "pid", "gui"]

  if (!availableOptions.includes(argv.action)) {
    console.log(kleur.red("There is no such command!"))
    console.log(
      `Available options for gramma server: ${availableOptions.join(" | ")}`,
    )
    process.exit(1)
  }

  if (argv.action === "install") {
    await installServer(cfg)
    process.exit()
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

  if (argv.action === "gui") {
    showServerGUI(cfg)
    process.exit()
  }
}

module.exports = server
