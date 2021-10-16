const fs = require("fs")
const path = require("path")
const { execSync } = require("child_process")
const initialConfig = require("../initialConfig")

const addWordFields = (matches) => {
  return matches.map((match) => {
    const word = match.context.text.substr(
      match.context.offset,
      match.context.length,
    )

    return { ...match, word }
  })
}

const removeFalsePositives = (matches, dictionary, disabledRules) => {
  return matches.filter(
    (match) =>
      !disabledRules.includes(match.rule.category.id) &&
      !(
        match.rule.issueType === "misspelling" &&
        dictionary.includes(match.word)
      ),
  )
}

const createTempFile = (file, text) => {
  fs.writeFileSync(file, text)
}

const removeTempFile = (file) => {
  fs.unlinkSync(file)
}

const MAX_REPLACEMENTS = 30

/**
 * Calls the provided LanguageTool API
 * and returns grammar checker suggestions.
 *
 * @param {string} text text to check
 * @param {Object} options request config
 *
 * @returns {Promise<Object>} grammar checker suggestions
 */
const checkViaCmd = (text, options = {}, serverDirPath, configDirPath) => {
  const cfg = { ...initialConfig, ...options }
  // console.log({ cfg, serverDirPath, configDirPath })

  const disabledRules = Object.entries(cfg.rules)
    // eslint-disable-next-line no-unused-vars
    .filter(([rule, value]) => value === false)
    .map(([rule]) => rule.toUpperCase())

  const tempFile = path.join(configDirPath, ".temp")

  createTempFile(tempFile, text)

  const jar = path.join(serverDirPath, "languagetool-commandline.jar")
  const lang = cfg.language === "auto" ? " -adl" : ` -l ${cfg.language}`
  const disabled =
    disabledRules.length === 0 ? "" : ` -d ${disabledRules.join(",")}`

  const cmd = `java -jar ${jar}${lang}${disabled} --json ${tempFile}`

  let response

  try {
    response = execSync(cmd, { stdio: "pipe" })
    response = response.toString()
  } catch (e) {
    removeTempFile(tempFile)
    throw new Error("Cannot execute command via local LanguageTool cmd")
  }

  removeTempFile(tempFile)

  const result = JSON.parse(response)

  const resultWithWords = {
    ...result,
    matches: removeFalsePositives(
      addWordFields(result.matches),
      cfg.dictionary,
      cfg.api_url === initialConfig.api_url ? disabledRules : [],
    ),
  }

  resultWithWords.matches.forEach((match) => {
    if (match.replacements.length > MAX_REPLACEMENTS) {
      match.replacements.length = MAX_REPLACEMENTS // eslint-disable-line
    }
  })

  return resultWithWords
}

module.exports = checkViaCmd
