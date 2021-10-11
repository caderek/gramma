const { check } = require("../src")

const main = async () => {
  const { language, matches } = await check(`<a href="#xyz">Helo</a> worlt!`, {
    markdown: true,
  })

  console.log({ lang: language.name, mistakes: matches.length })
}

main()
