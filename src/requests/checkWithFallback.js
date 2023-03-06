const kleur = require("kleur")
const startServer = require("../server/startServer")
const checkViaAPI = require("./checkViaAPI")
const checkViaCmd = require("./checkViaCmd")
const stopServer = require("../server/stopServer")

const checkWithFallback = async (text, cfg) => {
  const { session, global } = cfg
  let response

  try {
    console.info(`Checking via ${cfg.session.api_url}...`)

    response = await checkViaAPI(text, session)

    if (
      cfg.session.api_url.includes("0.0.0.0") &&
      cfg.session.server_once === "true"
    ) {
      await stopServer(cfg)
    }
  } catch (error) {
    if (error.code === "ECONNREFUSED" || cfg.session.api_url === "0.0.0.0") {
      if (global.server_path) {
        if (!session.markdown) {
          console.info(`Checking via local LanguageTool cmd...`)

          response = await checkViaCmd(
            text,
            session,
            global.server_path,
            cfg.paths.globalConfigDir,
          )
        } else {
          const { server, api_url } = await startServer(cfg)
          console.clear()
          const updatedSession = { ...session, api_url }
          response = await checkViaAPI(text, updatedSession)

          if (global.server_once === "true") {
            server.kill()
          }
        }
      } else {
        console.log(kleur.red(`API server ${session.api_url} not available!`))
        console.log("Please make sure that the server is running.")
        console.log(
          "TIP: Gramma is able to automatically start local API server if you install it via: gramma server install",
        )
        process.exit(1)
      }
    } else {
      console.log("Gramma was unable to get a response from API server.")
      console.log(`Details: ${error.message}`)
      process.exit(1)
    }
  }

  return response
}

module.exports = checkWithFallback
