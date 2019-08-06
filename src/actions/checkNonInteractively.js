const kleur = require("kleur")
const checkWithFallback = require("../requests/checkWithFallback")
const Mistake = require("../components/Mistake")

const print = (result, styles) => {
  if (result.matches.length === 0) {
    console.log(kleur.green("No mistakes found!"))
  } else {
    console.log(
      `Found ${result.matches.length} potential mistake${
        result.matches.length === 1 ? "" : "s"
      }`,
    )
    console.log()
    console.log(
      result.matches.map((match) => Mistake(match, styles)).join("\n"),
    )
  }
}

const checkNonInteractively = async (text, cfg, styles = true) => {
  if (!text || text.trim().length === 0) {
    console.log(kleur.yellow("Nothing to check!"))
    return 0
  }

  console.info(`Checking via ${cfg.session.api_url}...`)

  const result = await checkWithFallback(text, cfg)
  console.log(`Language: ${result.language.name}`)

  print(result, styles)

  return result.matches.length === 0 ? 0 : 1
}

module.exports = checkNonInteractively
