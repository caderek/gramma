const querystring = require("querystring")
const fetch = require("node-fetch")
const config = require("../src/initialConfig")
const fs = require("fs")

const LOCAL_API_URL = "http://localhost:8082/v2/languages"

const checkSupport = async (language) => {
  const postData = querystring.stringify({
    api_key: "",
    language,
    text: "abc",
    // ...disabledRulesEntry,
  })

  const response = await fetch(config.api_url, {
    credentials: "include",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: postData,
    method: "POST",
  })

  console.log(`Checking ${language}`)

  try {
    await response.json()
  } catch (e) {
    return false
  }
  return true
}

const main = async () => {
  const res = await fetch(LOCAL_API_URL)
  const languages = await res.json()

  const nameMaxLength = Math.max(...languages.map((l) => l.name.length))
  const codeMaxLength = Math.max(...languages.map((l) => l.longCode.length))

  for (const language of languages) {
    language.grammarbot = await checkSupport(language.longCode)
  }

  fs.writeFileSync("data/languages.json", JSON.stringify(languages, null, 2))

  const docs = languages
    .map(
      ({ name, longCode, grammarbot }) =>
        `<tr><td><tt style="white-space: pre;">${longCode}</tt></td><td>${name}</td><td>${
          grammarbot ? "" : "<i>(local server only)</i>"
        }</td></tr>`,
    )
    .join("\n")

  console.log(docs)
}

main()
