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

  const versionRegex = /v\d\.\d\.\d/g

  const readme = fs
    .readFileSync("README.md")
    .toString()
    .replace(versionRegex, `v${version}`)

  fs.writeFileSync("README.md", readme)
  console.log("README links updated!")

  const website = fs
    .readFileSync("_layouts/default.html")
    .toString()
    .replace(versionRegex, `v${version}`)

  fs.writeFileSync("_layouts/default.html", website)
  console.log("Website links updated!")
}

main()
