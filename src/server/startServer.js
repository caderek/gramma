const { spawn } = require("child_process")
const { homedir } = require("os")
const kleur = require("kleur")
const fetch = require("node-fetch")
const config = require("../config")
const configure = require("../commands/configure")

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const prepareCommand = (commandWithArgs) => {
  return commandWithArgs
    .split(" ")
    .filter((item) => item.trim().length !== 0)
    .map((item) => (item[0] === "~" ? item.replace("~", homedir()) : item))
}

const pingServer = async (cfg) => {
  console.log("Waiting for local API server...")
  const response = await fetch(`${cfg.api_url}?language=en-US&text=`).catch(
    () => {
      return {
        status: 500,
      }
    },
  )

  if (response.status === 200) {
    return
  }

  await delay(1000)
  await pingServer(cfg)
}

const startServer = async (isGlobal, viaCommand = false) => {
  const cfg = isGlobal ? config.global : config.local

  if (!cfg.server_command || !cfg.api_url) {
    console.log(
      kleur.red(
        `Please configure "server_command" and "api_url" for ${
          isGlobal ? "global" : "local"
        } config!`,
      ),
    )
    return false
  }

  console.log("Starting local API server...")

  const [command, ...params] = prepareCommand(cfg.server_command)

  const server = spawn(command, params, { windowsHide: true })

  server.on("error", (error) => {
    if (error) {
      console.log(kleur.red("Cannot start local API server automatically."))
      console.log('Please check your "server_command" config.')
      process.exit(1)
    }
  })

  await pingServer(cfg)

  if (cfg.server_once !== "true" || viaCommand) {
    configure("server_pid", server.pid, isGlobal)
  }

  console.log(kleur.green(`API server started! PID: ${server.pid}`))

  return server
}

module.exports = startServer
