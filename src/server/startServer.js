const { spawn } = require("child_process")
const path = require("path")
const kleur = require("kleur")
const fetch = require("node-fetch")
const portfinder = require("portfinder")
const configure = require("../actions/configure")

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const pingServer = async (url) => {
  console.log("Waiting for local API server...")
  const response = await fetch(`${url}?language=en-US&text=`).catch(() => {
    return {
      status: 500,
    }
  })

  if (response.status === 200) {
    return
  }

  await delay(1000)
  await pingServer(url)
}

const startServer = async (cfg, viaCommand = false) => {
  if (!cfg.global.server_path) {
    console.log(
      kleur.red(`Please install local server via: gramma server install`),
    )
    return false
  }

  console.log("Starting local API server...")

  const PORT = await portfinder.getPortPromise({
    port: 8081,
  })

  const command = "java"

  const params = [
    "-cp",
    path.join(cfg.global.server_path, "languagetool-server.jar"),
    "org.languagetool.server.HTTPServer",
    "--port",
    PORT,
    "--allow-origin",
    "'*'",
  ]

  const server = spawn(command, params, { windowsHide: true, detached: true })

  server.on("error", (error) => {
    if (error) {
      console.log(kleur.red("Cannot start local API server automatically."))
      process.exit(1)
    }
  })

  // eslint-disable-next-line camelcase
  const api_url = `http://localhost:${PORT}/v2/check`

  await pingServer(api_url)

  configure("api_url", api_url, cfg, true, true)

  if (cfg.global.server_once !== "true" || viaCommand) {
    configure("server_pid", server.pid, cfg, true, true)
  }

  console.log(kleur.green(`API server started! PID: ${server.pid}`))

  return { server, api_url }
}

module.exports = startServer
