const querystring = require("querystring")
const fetch = require("node-fetch")
const settings = require("../../settings.json")

/**
 * @param {string} text text to check
 * @returns {Promise<Object>}
 */
const checkViaAPI = async (text) => {
  const postData = querystring.stringify({
    api_key: settings.api_key,
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

  return response.json()
}

module.exports = checkViaAPI
