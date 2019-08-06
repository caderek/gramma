const fs = require("fs")
const kleur = require("kleur")
const { isRule, ruleOptions } = require("../validators/rules")
const { isLanguage, languageOptions } = require("../validators/languages")

const availableOptions = [
  "api_key",
  "api_url",
  "dictionary",
  "server_command",
  "server_once",
  "server_pid",
  "language",
  "enable",
  "disable",
]

const addToDictionary = (dictionary, word) => {
  const dict = Array.isArray(dictionary) ? dictionary : []

  if (dict.includes(word)) {
    return dict
  }

  return [...dict, word].sort()
}

const changeRule = (rules, ruleName, isEnabled) => {
  return { ...rules, [ruleName]: isEnabled }
}

const prepareEntry = (key, value, cfg) => {
  if (key === "dictionary") {
    return { dictionary: addToDictionary(cfg.dictionary, value) }
  }

  if (key === "enable" || key === "disable") {
    if (!isRule(value)) {
      console.log(kleur.red("There is no such rule"))
      console.log(`Available options: ${ruleOptions.join(", ")}`)
      process.exit(1)
    }

    return { rules: changeRule(cfg.rules, value, key === "enable") }
  }

  if (key === "language" && !isLanguage(value)) {
    console.log(kleur.red("There is no such language option"))
    console.log(`Available options: ${languageOptions.join(", ")}`)
    process.exit(1)
  }

  return { [key]: value }
}

const configure = (key, value, cfg, isGlobal = false) => {
  if (!availableOptions.includes(key)) {
    console.log(`There is no '${key}' option!`)
    console.log("Available options:")
    console.dir(availableOptions, { colors: true, depth: 1 })
    return
  }

  if (isGlobal && !fs.existsSync(cfg.paths.globalConfigDir)) {
    fs.mkdirSync(cfg.paths.globalConfigDir, { recursive: true })
  }

  const currentConfig = isGlobal ? cfg.global : cfg.local
  const configFilePath = isGlobal
    ? cfg.paths.globalConfigFile
    : cfg.paths.localConfigFile

  const entry = prepareEntry(key, value, currentConfig)

  const updatedConfig = { ...currentConfig, ...entry }

  if (isGlobal) {
    // eslint-disable-next-line no-param-reassign
    cfg.global = updatedConfig
  } else {
    // eslint-disable-next-line no-param-reassign
    cfg.local = updatedConfig
  }

  fs.writeFileSync(configFilePath, JSON.stringify(updatedConfig, null, 2))
}

module.exports = configure
