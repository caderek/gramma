const checkViaAPI = require("./checkViaAPI")
const kleur = require("kleur")
const Mistake = require("./components/Mistake")

const print = (result) => {
  if (result.matches.length === 0) {
    console.log(kleur.green("No mistakes found!"))
  } else {
    console.log(`Found ${result.matches.length} potential mistakes`)
    console.log()
    console.log(result.matches.map(Mistake).join("\n"))
  }
}

const check = async (text) => {
  const result = await checkViaAPI(text)
  print(result)
}

module.exports = check
