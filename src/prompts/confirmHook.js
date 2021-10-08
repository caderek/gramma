const prompts = require("prompts")

const confirmHook = () => {
  return prompts([
    {
      type: "toggle",
      name: "hook",
      message: "Add Git hook?",
      initial: true,
      active: "yes",
      inactive: "no",
    },
  ])
}

module.exports = confirmHook
