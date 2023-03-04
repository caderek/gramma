const fetch = require("node-fetch")
const queryString = require("query-string")
const initialConfig = require("../initialConfig")
// @ts-ignore
const prepareMarkdown = require("../utils/prepareMarkdown").default

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
const checkViaAPI = async (text, options = {}) => {
  const cfg = { ...initialConfig, ...options }
  const disabledRules = Object.entries(cfg.rules)
    // eslint-disable-next-line no-unused-vars
    .filter(([rule, value]) => value === false)
    .map(([rule]) => rule.toUpperCase())

  const disabledRulesEntry =
    disabledRules.length === 0 || cfg.api_url.includes("grammarbot")
      ? {}
      : { disabledCategories: disabledRules.join(",") }

  const input = options.markdown ? { data: prepareMarkdown(text) } : { text }

  const postData = queryString.stringify({
    api_key: cfg.api_key,
    language: cfg.language,
    ...input,
    ...disabledRulesEntry,
  })

  // eslint-disable-next-line
  const response = await fetch(cfg.api_url, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: postData,
    method: "POST",
  })

  const body = await response.text()

  let result

  try {
    result = JSON.parse(body)
  } catch (e) {
    if (cfg.api_url.includes("grammarbot")) {
      throw new Error(
        "Language not available at grammarbot.io.\n" +
          "Please consider installing a local LanguageTool server:\n" +
          "https://github.com/caderek/gramma#installing-local-server",
      )
    } else {
      throw new Error(body)
    }
  }

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

module.exports = checkViaAPI
