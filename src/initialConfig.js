const { ruleOptions } = require("./validators/rules")

const rules = {}

ruleOptions.forEach((rule) => {
  rules[rule] = true
})

const initialConfig = {
  api_url: "http://api.grammarbot.io/v2/check",
  api_key: "",
  dictionary: [],
  language: "en-US",
  rules,
}

module.exports = initialConfig
