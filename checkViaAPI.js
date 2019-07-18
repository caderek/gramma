const querystring = require('querystring')
const https = require('https')
const settings = require('./settings.json')

const checkViaAPI = (text) => {
  const postData = querystring.stringify({
    api_key: settings.api_key,
    language: 'en-US',
    text,
  })

  const options = {
    hostname: 'api.grammarbot.io',
    path: '/v2/check',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': postData.length,
    },
  }

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      // console.log('statusCode:', res.statusCode)
      // console.log('headers:', res.headers)
      // console.log('-----------------------')

      res.on('data', (data) => {
        resolve(JSON.parse(data.toString()))
      })
    })

    req.on('error', (e) => {
      reject(e)
    })

    req.write(postData)
    req.end()
  })
}

module.exports = checkViaAPI
