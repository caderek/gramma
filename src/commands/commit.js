const fs = require("fs")
const { execSync } = require("child_process")
const path = require("path")
const checkInteractively = require("../actions/checkInteractively")

const commit = async (argv, cfg) => {
  const { text } = await checkInteractively(argv.text, cfg)

  try {
    if (fs.existsSync(path.join(process.cwd(), ".gramma.json"))) {
      execSync(`git add .gramma.json`)
    }

    const output = argv.all
      ? execSync(`git commit -am "${text}"`)
      : execSync(`git commit -m "${text}"`)

    process.stdout.write(output)
  } catch (error) {
    process.stderr.write(error.stdout)
  }
  process.exit()
}

module.exports = commit
