const prompts = require("prompts")

const confirmConfig = () => {
  return prompts([
    {
      type: "toggle",
      name: "useGlobal",
      message:
        "Local config not found. Should I use the global config instead?",
      initial: true,
      active: "yes",
      inactive: "no",
    },
  ])
}

module.exports = confirmConfig
