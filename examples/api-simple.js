const { check } = require("../src")

const main = async () => {
  const { language, matches } = await check("Some wrongg text to check.")

  console.log({ lang: language.name, mistakes: matches.length })
}

main()
