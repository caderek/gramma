const kleur = require("kleur")
const checkWithFallback = require("../requests/checkWithFallback")
const Mistake = require("../components/Mistake")
const handleMistake = require("../prompts/handleMistake")
const replaceAll = require("../text-manipulation/replaceAll")
const equal = require("../utils/equal")
const configure = require("../actions/configure")

const checkInteractively = async (text, cfg) => {
  if (!text || text.trim().length === 0) {
    console.log(kleur.yellow("Nothing to check!"))
    return { changed: false }
  }

  console.info(`Checking via ${cfg.session.api_url}...`)

  const result = await checkWithFallback(text, cfg)

  if (result.matches.length === 0) {
    console.log(kleur.green("No mistakes found!"))
    return { changed: false, text }
  }
  console.log(
    `Found ${result.matches.length} potential mistake${
      result.matches.length === 1 ? "" : "s"
    }`,
  )

  let { matches } = result
  const total = matches.length
  const transformations = []

  while (matches.length > 0) {
    console.clear()
    console.log(`Language: ${result.language.name}`)
    console.log(
      `Resolved: ${total - matches.length} | Pending: ${matches.length}`,
    )

    const currentMatch = matches.shift()
    console.log(Mistake(currentMatch))

    // eslint-disable-next-line no-await-in-loop
    const { option, replacement } = await handleMistake(
      currentMatch.replacements,
      currentMatch.rule.issueType,
    )

    if (option === "l") {
      configure("dictionary", currentMatch.word, cfg, false)
    } else if (option === "g") {
      configure("dictionary", currentMatch.word, cfg, true)
    }

    if (["i", "l", "g"].includes(option)) {
      matches = matches.filter((match) => {
        return !equal(
          [
            match.message,
            match.shortMessage,
            match.replacements,
            match.type,
            match.rule,
            match.word,
          ],
          [
            currentMatch.message,
            currentMatch.shortMessage,
            currentMatch.replacements,
            currentMatch.type,
            currentMatch.rule,
            currentMatch.word,
          ],
        )
      })
    } else if (option === "n") {
      matches.push(currentMatch)
    } else if (option === "0") {
      transformations.push({
        change: replacement,
        offset: currentMatch.offset,
        length: currentMatch.length,
      })
    } else {
      try {
        transformations.push({
          change: currentMatch.replacements[Number(option) - 1].value,
          offset: currentMatch.offset,
          length: currentMatch.length,
        })
      } catch (e) {
        // It prevents from displaying error when users aborts with Ctrl-c
        if (e.message === "Cannot read property 'value' of undefined") {
          console.clear()
          process.exit(0)
        }

        console.error(e)
      }
    }
  }

  return { changed: true, text: replaceAll(text, transformations) }
}

module.exports = checkInteractively
