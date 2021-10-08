const fs = require("fs")
const { execSync } = require("child_process")
const { version } = require("../package.json")

const cmd = (name) =>
  `zip -9 -j bin/gramma-${name}-v${version}.zip bin/${name}/gramma${
    name.includes("windows") ? ".exe" : ""
  }`

const main = () => {
  const folders = fs.readdirSync("bin").filter((name) => !name.includes(".zip"))

  folders.forEach((folder) => {
    console.log(`Creating zip file for ${folder}...`)
    execSync(cmd(folder))
    console.log(`Zip file for ${folder} created!`)
  })

  const links = folders
    .map(
      (name) =>
        `- [gramma-${name}-v${version}.zip](https://github.com/caderek/gramma/releases/download/v${version}/gramma-${name}-v${version}.zip)`,
    )
    .join("\n")

  const docs = `<!--BIN-->\n\n${links}\n\n<!--/BIN-->`

  const readme = fs
    .readFileSync("README.md")
    .toString()
    .replace(/<!--BIN-->(.|\n)+<!--\/BIN-->/, docs)

  fs.writeFileSync("README.md", readme)
  console.log("README links updated!")
}

main()
