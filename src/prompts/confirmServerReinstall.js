const prompts = require("prompts")

const confirmServerReinstall = () => {
  return prompts([
    {
      type: "confirm",
      name: "reinstall",
      message: "Server already installed. Do you want to reinstall?",
      initial: true,
    },
  ])
}

module.exports = confirmServerReinstall
