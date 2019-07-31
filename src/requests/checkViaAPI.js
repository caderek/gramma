const querystring = require("querystring")
const fetch = require("node-fetch")
const { session } = require("../config")

const addWordFields = (matches) => {
  return matches.map((match) => {
    const word = match.context.text.substr(
      match.context.offset,
      match.context.length,
    )

    return { ...match, word }
  })
}

const removeFalsePositives = (matches, dictionary) => {
  return matches.filter(
    (match) =>
      !(
        match.rule.issueType === "misspelling" &&
        dictionary.includes(match.word)
      ),
  )
}

/**
 * @param {string} text text to check
 * @returns {Promise<Object>}
 */
const checkViaAPI = async (text, dictionary = []) => {
  const postData = querystring.stringify({
    api_key: session.api_key,
    language: "en-US",
    text: encodeURIComponent(text),
  })

  const response = await fetch("http://api.grammarbot.io/v2/check", {
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
    matches: removeFalsePositives(addWordFields(result.matches), dictionary),
  }

  return resultWithWords
}

module.exports = checkViaAPI
