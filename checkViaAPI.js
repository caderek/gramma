const querystring = require('querystring')
const settings = require('./settings.json')
const fetch = require('node-fetch')

const checkViaAPI = (text) => {
  const postData = querystring.stringify({
    api_key: settings.api_key,
    language: 'en-US',
    text: encodeURIComponent(text),
  })

  return fetch('http://api.grammarbot.io/v2/check', {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: postData,
    method: 'POST',
  }).then((response) => response.json())
}

module.exports = checkViaAPI
