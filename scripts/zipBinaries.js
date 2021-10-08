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
}

main()
