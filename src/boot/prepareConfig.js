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
    : null
}

const prepareArgvConfig = ({ language, disable, enable, global }) => {
  const disabledRules = Array.isArray(disable) ? disable : [disable]
  const enabledRules = Array.isArray(enable) ? enable : [enable]
  const rules = {}

  disabledRules.forEach((rule) => {
    rules[rule] = false
  })

  enabledRules.forEach((rule) => {
    rules[rule] = true
  })

  return {
    language,
    rules,
    modifiers: {
      global,
    },
  }
}

const prepareConfig = (paths) => (argv) => {
  const globalConfig = prepareFileConfig(paths.globalConfigFile)
  const localConfig = prepareFileConfig(paths.localConfigFile)
  const argvConfig = prepareArgvConfig(argv)

  const fileConfig = localConfig || globalConfig || {}

  // File configs replace one another,
  // so user's and project's configs won't mix
  const cfg = {
    ...initialConfig,
    ...fileConfig,
  }

  // If local config has api_url set to 'inherit'
  // then Gramma will use global settings (if set) or initial settings.
  // This allows to use dynamic url of the local server
  // eslint-disable-next-line camelcase
  const api_url =
    cfg.api_url === "inherit"
      ? (globalConfig || {}).api_url || initialConfig.api_url
      : cfg.api_url

  // Argv config alters nested values,
  // so you can change some rules for specific checks,
  // without erasing other rules defined in config files
  const sessionConfig = {
    ...cfg,
    language:
      argvConfig.language === "config" ? cfg.language : argvConfig.language,
    rules: { ...cfg.rules, ...argvConfig.rules },
    modifiers: argvConfig.modifiers,
    api_url,
  }

  return {
    initial: initialConfig,
    global: globalConfig || {},
    local: localConfig || {},
    session: sessionConfig,
    paths,
  }
}

module.exports = prepareConfig({
  globalConfigDir,
  globalConfigFile,
  localConfigFile,
  home,
  serverDownload: "https://languagetool.org/download/LanguageTool-stable.zip",
})
