const prompts = require("prompts")
const initialConfig = require("../initialConfig")

const confirmInit = (hasGit) => {
  return prompts([
    {
      type: "select",
      name: "api",
      message: "Choose API url:",
      choices: [
        { title: "languagetool.org", value: initialConfig.api_url },
        {
          title: "Inherit from global config",
          value: "inherit",
        },
      ],
      initial: 0,
    },
    {
      type: hasGit ? "toggle" : null,
      name: "hook",
      message: "Add Git hook?",
      initial: true,
      active: "yes",
      inactive: "no",
    },
  ])
}

module.exports = confirmInit
