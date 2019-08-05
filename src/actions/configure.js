const fs = require("fs")

const availableOptions = [
  "api_key",
  "api_url",
  "dictionary",
  "server_command",
  "server_once",
  "server_pid",
]

const addToDictionary = (dictionary, word) => {
  const dict = Array.isArray(dictionary) ? dictionary : []

  if (dict.includes(word)) {
    return dict
  }

  return [...dict, word].sort()
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

  const entry =
    key === "dictionary"
      ? { dictionary: addToDictionary(currentConfig.dictionary, value) }
      : { [key]: value }

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
