const kleur = require("kleur")
const startServer = require("../server/startServer")
const checkViaAPI = require("./checkViaAPI")

const checkWithFallback = async (text, cfg) => {
  const { session, global } = cfg
  let response

  try {
    response = await checkViaAPI(text, session)
  } catch (error) {
    if (error.code === "ECONNREFUSED" || cfg.session.api_url === "localhost") {
      if (global.server_path) {
        // eslint-disable-next-line camelcase
        const { server, api_url } = await startServer(cfg)
        console.clear()
        const updatedSession = { ...session, api_url }
        response = await checkViaAPI(text, updatedSession)

        if (global.server_once === "true") {
          server.kill()
        }
      } else {
        console.log(kleur.red(`API server ${session.api_url} not available!`))
        console.log("Please make sure that the server is running.")
        console.log(
          "TIP: Gramma is able to automatically start local API server if you install it via: gramma server install",
        )
        process.exit()
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
