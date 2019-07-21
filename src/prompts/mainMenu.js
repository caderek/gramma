const prompts = require("prompts")

const mainMenu = () => {
  const choices = [
    { title: "check file", value: "check" },
    { title: "check text", value: "listen" },
  ]

  return prompts([
    {
      type: "select",
      name: "saveOption",
      message: "What do you want to do?",
      choices,
    },
    {
      type: (prev) => (prev === "check" ? "text" : null),
      name: "fileName",
      message: "Chose file path (relative or absolute)",
    },
  ])
}

module.exports = mainMenu
