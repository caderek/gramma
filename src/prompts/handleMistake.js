const prompts = require("prompts")
const FixMenu = require("../components/FixMenu")

const handleMistake = (fixes, issue) => {
  console.log("---------------------------------")

  const dictionaryOptions = issue === "misspelling" ? ["l", "g"] : []
  const validInputs = [
    ...fixes.map((_, index) => String(index + 1)),
    "0",
    "i",
    ...dictionaryOptions,
    "n",
  ]

  const initialInput = fixes.length > 0 ? "1" : "0"

  return prompts([
    {
      type: "text",
      name: "option",
      message: FixMenu(fixes, issue),
      initial: initialInput,
      validate(input) {
        return validInputs.includes(input)
          ? true
          : `Please enter a valid option...`
      },
    },
    {
      type: (prev) => (prev === "0" ? "text" : null),
      name: "replacement",
      message: "Provide replacement",
    },
  ])
}

module.exports = handleMistake
