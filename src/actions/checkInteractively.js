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

  console.info(`Checking...`)

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
      transformations.push({
        change: currentMatch.replacements[Number(option) - 1].value,
        offset: currentMatch.offset,
        length: currentMatch.length,
      })
    }
  }

  return { changed: true, text: replaceAll(text, transformations) }
}

module.exports = checkInteractively