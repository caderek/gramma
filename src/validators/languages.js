const languages = require("../../data/languages.json")

const languageOptions = [
  "config",
  "auto",
  ...languages.map((language) => language.longCode),
]

const isLanguage = (value) => {
  return languageOptions.includes(value)
}

module.exports = {
  languageOptions,
  isLanguage,
}
