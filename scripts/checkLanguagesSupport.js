const fs = require("fs")
const querystring = require("querystring")
const fetch = require("node-fetch")

const LOCAL_API_URL = "http://localhost:8082/v2/languages"

const checkSupport = async (language, api) => {
  const postData = querystring.stringify({
    api_key: "",
    language,
    text: "abc",
    // ...disabledRulesEntry,
  })

  const response = await fetch(api, {
    credentials: "include",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: postData,
    method: "POST",
  })

  console.log(`Checking ${language} at ${api}`)

  try {
    await response.json()
  } catch (e) {
    return false
  }
  return true
}

const LANGUAGETOOL_ORG_LIMIT = 20 // req/min
const interval = (60 * 1000) / LANGUAGETOOL_ORG_LIMIT
const delay = () => new Promise((resolve) => setTimeout(resolve, interval))

const main = async () => {
  const res = await fetch(LOCAL_API_URL)
  const languages = await res.json()

  for (const language of languages) {
    language.grammarbotIo = await checkSupport(
      language.longCode,
      "http://api.grammarbot.io/v2/check",
    )
    language.languagetoolOrg = await checkSupport(
      language.longCode,
      "https://api.languagetool.org/v2/check",
    )

    await delay()
  }

  fs.writeFileSync("data/languages.json", JSON.stringify(languages, null, 2))

  const entries = languages
    .map(
      ({ name, longCode, grammarbotIo, languagetoolOrg }) =>
        `
      <tr>
        <td><tt style="white-space: pre;">${longCode}</tt></td>
        <td>${name}</td>
        <td>${languagetoolOrg ? "✔" : "-"}</td>
        <td>✔</td>
        <td>${grammarbotIo ? "✔" : "-"}</td>
      </tr>
        `,
    )
    .join("")

  const docs = `<!--LANG-->\n${entries}\n      <!--/LANG-->`.replace(
    /^\s*[\r\n]/gm,
    "",
  )

  const readme = fs
    .readFileSync("README.md")
    .toString()
    .replace(/<!--LANG-->(.|\n)+<!--\/LANG-->/, docs)

  fs.writeFileSync("README.md", readme)
  console.log("README entries updated!")
}

main()
