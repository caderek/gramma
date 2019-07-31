const kleur = require("kleur")
const checkViaAPI = require("../requests/checkViaAPI")
const Mistake = require("../components/Mistake")

const print = (result, styles) => {
  if (result.matches.length === 0) {
    console.log(kleur.green("No mistakes found!"))
  } else {
    console.log(`Found ${result.matches.length} potential mistakes`)
    console.log()
    console.log(
      result.matches.map((match) => Mistake(match, styles)).join("\n"),
    )
  }
}

const check = async (text, dictionary, styles = true) => {
  const result = await checkViaAPI(text, dictionary)
  print(result, styles)

  return result.matches.length === 0 ? 0 : 1
}

module.exports = check
