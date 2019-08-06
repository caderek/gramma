const rules = require("../../data/rules.json")

const ruleOptions = rules.map((rule) => rule.id.toLowerCase())

const isRule = (value) => {
  return ruleOptions.includes(value)
}

module.exports = {
  ruleOptions,
  isRule,
}
