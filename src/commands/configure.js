const fs = require("fs")
const config = require("../config")

const availableOptions = ["api_key", "dictionary"]

const addToDictionary = (dictionary, word) => {
  const dict = Array.isArray(dictionary) ? dictionary : []

  if (dict.includes(word)) {
    return dict
  }

  return [...dict, word].sort()
}

const configure = (key, value, global = false) => {
  if (!availableOptions.includes(key)) {
    console.log(`There is no '${key}' option!`)
    console.log("Available options:")
    console.dir(availableOptions, { colors: true, depth: 1 })
    return
  }

  if (global && !fs.existsSync(config.paths.globalConfigDir)) {
    fs.mkdirSync(config.paths.globalConfigDir, { recursive: true })
  }

  const currentConfig = global ? config.global : config.local
  const configFilePath = global
    ? config.paths.globalConfigFile
    : config.paths.localConfigFile

  const entry =
    key === "dictionary"
      ? { dictionary: addToDictionary(currentConfig.dictionary, value) }
      : { [key]: value }

  const updatedConfig = { ...currentConfig, ...entry }

  if (global) {
    config.global = updatedConfig
  } else {
    config.local = updatedConfig
  }

  fs.writeFileSync(configFilePath, JSON.stringify(updatedConfig, null, 2))
}

module.exports = configure
