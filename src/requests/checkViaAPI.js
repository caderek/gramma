const querystring = require("querystring")
const fetch = require("node-fetch")
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

/**
 * @param {string} text text to check
 * @param {Object} options session config
 * @param {string} options.api_url
 * @param {string} options.api_key
 * @param {string} options.language
 * @param {Object} options.rules
 * @param {string[]} options.dictionary
 * @returns {Promise<Object>}
 */
const checkViaAPI = async (text, options = {}) => {
  const cfg = { ...initialConfig, ...options }
  const disabledRules = Object.entries(cfg.rules)
    // eslint-disable-next-line no-unused-vars
    .filter(([rule, value]) => value === false)
    .map(([rule]) => rule.toUpperCase())

  const disabledRulesEntry =
    disabledRules.length === 0 || cfg.api_url === initialConfig.api_url
      ? {}
      : { disabledCategories: disabledRules.join(",") }

  const postData = querystring.stringify({
    api_key: cfg.api_key,
    language: cfg.language,
    text,
    ...disabledRulesEntry,
  })

  const response = await fetch(cfg.api_url, {
    credentials: "include",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: postData,
    method: "POST",
  })

  const result = await response.json()

  const resultWithWords = {
    ...result,
    matches: removeFalsePositives(
      addWordFields(result.matches),
      cfg.dictionary,
      cfg.api_url === initialConfig.api_url ? disabledRules : [],
    ),
  }

  return resultWithWords
}

module.exports = checkViaAPI
