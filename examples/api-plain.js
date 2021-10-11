const { check } = require("../src")

const main = async () => {
  const response = await check(`Helo worlt!`, {
    markdown: true,
  })

  console.dir(response, { depth: null })
}

main()
