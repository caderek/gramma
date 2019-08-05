const kleur = require("kleur")
const startServer = require("../server/startServer")
const checkViaAPI = require("./checkViaAPI")

const checkWithFallback = async (text, cfg) => {
  const { session, initial, local } = cfg
  let response

  try {
    response = await checkViaAPI(text, session)
  } catch (error) {
    if (error.code === "ECONNREFUSED") {
      if (
        session.server_command &&
        session.api_url &&
        session.api_url !== initial.api_url
      ) {
        const isGlobal = !local.server_command
        const server = await startServer(cfg)
        console.clear()
        response = await checkViaAPI(text, session)

        if (session.server_once === "true") {
          server.kill()
        }
      } else {
        console.log(kleur.red(`API server ${session.api_url} not available!`))
        console.log("Please make sure that the server is running.")
        console.log(
          'TIP: Gramma is able to automatically start custom API server if you configure "server_command" and "api_url" options.',
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
