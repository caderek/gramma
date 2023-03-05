const { spawn } = require("child_process")
const path = require("path")
const kleur = require("kleur")
const portfinder = require("portfinder")
const tcpPortUsed = require("tcp-port-used")
const fetch = require("node-fetch")
const configure = require("../actions/configure")
const confirmPort = require("../prompts/confirmPort")

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

const startServer = async (cfg, { port = null, viaCommand = false } = {}) => {
  if (!cfg.global.server_path) {
    console.log(
      kleur.red(`Please install local server via: gramma server install`),
    )
    process.exit(1)
  }

  if (port !== null) {
    const inUse = tcpPortUsed.check(port)

    if (inUse) {
      const { autoPort } = await confirmPort()

      if (!autoPort) {
        console.log(kleur.yellow("Aborted!"))
        process.exit(1)
      }
    }
  }

  console.log("Starting local API server...")

  const PORT = await portfinder.getPortPromise({
    port: port || 8081,
  })

  const command = "java"

  const params = [
    "-cp",
    path.join(cfg.global.server_path, "languagetool-server.jar"),
    "org.languagetool.server.HTTPServer",
    "--port",
    String(PORT),
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

  console.log(
    kleur.green(`API server started!\nPID: ${server.pid}\nAPI URL: ${api_url}`),
  )

  return { server, api_url }
}

module.exports = startServer
