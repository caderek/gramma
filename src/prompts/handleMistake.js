const prompts = require("prompts")
const FixMenu = require("../components/FixMenu")

const handleMistake = (fixes) => {
  const validInputs = [
    ...fixes.map((_, index) => String(index + 1)),
    "0",
    "i",
    "n",
  ]

  const initialInput = fixes.length > 0 ? "1" : "0"

  return prompts([
    {
      type: "text",
      name: "option",
      message: FixMenu(fixes),
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
