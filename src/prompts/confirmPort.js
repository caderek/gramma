const prompts = require("prompts")

const confirmPort = () => {
  return prompts([
    {
      type: "toggle",
      name: "autoPort",
      message: "Port is in use, should I automatically find another port?",
      initial: true,
      active: "yes",
      inactive: "no",
    },
  ])
}

module.exports = confirmPort
