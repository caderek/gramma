const fs = require("fs")
const path = require("path")
const { platform, homedir } = require("os")
const initialConfig = require("../initialConfig")

const configBasePath = {
  linux: ".config",
  darwin: "Library/Preferences",
  win32: "AppData/Roaming",
}

const home = homedir()
const globalConfigDir = path.join(home, configBasePath[platform()], "gramma")
const globalConfigFile = path.join(globalConfigDir, "gramma.json")
const localConfigFile = path.join(process.cwd(), ".gramma.json")

const prepareFileConfig = (filePath) => {
  return fs.existsSync(filePath)
    ? JSON.parse(fs.readFileSync(filePath).toString())
    : {}
}

const prepareArgvConfig = (argv) => {
  return {}
}

const prepareConfig = (paths) => (argv) => {
  const globalConfig = prepareFileConfig(paths.globalConfigFile)
  const localConfig = prepareFileConfig(paths.localConfigFile)
  const argvConfig = prepareArgvConfig(argv)

  const sessionConfig = {
    ...initialConfig,
    ...globalConfig,
    ...localConfig,
    ...argvConfig,
  }

  return {
    initial: initialConfig,
    global: globalConfig,
    local: localConfig,
    session: sessionConfig,
    paths,
  }
}

module.exports = prepareConfig({
  globalConfigDir,
  globalConfigFile,
  localConfigFile,
  home,
})
