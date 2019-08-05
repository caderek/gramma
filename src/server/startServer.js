const { spawn } = require("child_process")
const { homedir } = require("os")
const kleur = require("kleur")
const fetch = require("node-fetch")
const configure = require("../actions/configure")

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const prepareCommand = (commandWithArgs) => {
  return commandWithArgs
    .split(" ")
    .filter((item) => item.trim().length !== 0)
    .map((item) => (item[0] === "~" ? item.replace("~", homedir()) : item))
}

const pingServer = async (usedCfg) => {
  console.log("Waiting for local API server...")
  const response = await fetch(`${usedCfg.api_url}?language=en-US&text=`).catch(
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
  await pingServer(usedCfg)
}

const startServer = async (cfg, viaCommand = false) => {
  const usedCfg = cfg.modifiers.global ? cfg.global : cfg.local

  if (!usedCfg.server_command || !usedCfg.api_url) {
    console.log(
      kleur.red(
        `Please configure "server_command" and "api_url" for ${
          cfg.modifiers.global ? "global" : "local"
        } config!`,
      ),
    )
    return false
  }

  console.log("Starting local API server...")

  const [command, ...params] = prepareCommand(usedCfg.server_command)

  const server = spawn(command, params, { windowsHide: true, detached: true })

  server.on("error", (error) => {
    if (error) {
      console.log(kleur.red("Cannot start local API server automatically."))
      console.log('Please check your "server_command" config.')
      process.exit(1)
    }
  })

  await pingServer(usedCfg)

  if (usedCfg.server_once !== "true" || viaCommand) {
    configure("server_pid", server.pid, cfg, cfg.modifiers.global)
  }

  console.log(kleur.green(`API server started! PID: ${server.pid}`))

  return server
}

module.exports = startServer
