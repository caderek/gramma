const fs = require("fs")
const path = require("path")
const { platform, homedir } = require("os")

const home = homedir()

const configBasePath = {
  linux: ".config",
  darwin: "Library/Preferences",
  win32: "AppData/Roaming",
}

const configDirPath = path.join(home, configBasePath[platform], "gramma")

const configFilePath = path.join(configDirPath, "gramma.json")

const localConfigFilePath = path.join(process.cwd(), ".gramma.json")

const defaultConfig = {
  api_key: "",
  dictionary: [],
}

const globalConfig = fs.existsSync(configFilePath)
  ? JSON.parse(fs.readFileSync(configFilePath).toString())
  : {}

const localConfig = fs.existsSync(localConfigFilePath)
  ? JSON.parse(fs.readFileSync(localConfigFilePath).toString())
  : {}

const sessionConfig = {
  ...defaultConfig,
  ...globalConfig,
  ...localConfig,
}

const config = {
  global: globalConfig,
  local: localConfig,
  session: sessionConfig,
  paths: {
    globalConfigDir: configDirPath,
    globalConfigFile: configFilePath,
    localConfigFile: localConfigFilePath,
    home,
  },
}

module.exports = config
