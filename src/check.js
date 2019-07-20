const checkViaAPI = require("./checkViaAPI")
const chalk = require("chalk")
const Mistake = require("./components/Mistake")

const print = (result) => {
  if (result.matches.length === 0) {
    console.log(chalk.green("No mistakes found!"))
  } else {
    console.log(`Found ${result.matches.length} potential mistakes`)
    console.log()
    console.log(result.matches.map(Mistake).join("\n"))
  }
}

const check = (text) => {
  checkViaAPI(text).then(print)
}

module.exports = check
