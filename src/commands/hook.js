const kleur = require("kleur")
const fs = require("fs")
const path = require("path")
const os = require("os")
const checkInteractively = require("../actions/checkInteractively")
const saveNow = require("../actions/saveNow")
const appLocation = require("../utils/appLocation")

const sys = os.platform()

const getHookCode = (command) => ({
  linux: {
    full: `#!/bin/sh\n\nexec < /dev/tty\n\n${command} hook $1\n`,
    partial: `\n\nexec < /dev/tty\n\n${command} hook $1\n`,
  },
  darwin: {
    full: `#!/bin/sh\n\nexec < /dev/tty\n\n${command} hook $1\n`,
    partial: `\n\nexec < /dev/tty\n\n${command} hook $1\n`,
  },
  win32: {
    full: `#!/bin/sh\n\nexec < /dev/tty\n\n${command} hook $1\n`.replace(
      /\\/g,
      "/",
    ),
    partial: `\n\nexec < /dev/tty\n\n${command} hook $1\n`.replace(/\\/g, "/"),
  },
})

const addHookCode = (onlyCreate = false) => {
  const gitRoot = path.join(process.cwd(), ".git")
  const hasGit = fs.existsSync(gitRoot)

  if (!hasGit) {
    console.log(kleur.red("No .git in this directory"))
    process.exit(1)
  }

  const hooksConfig = fs
    .readFileSync(path.join(gitRoot, "config"))
    .toString()
    .match(/hooksPath *=.*/gi)

  const hooksFolder = hooksConfig && hooksConfig[0].split("=")[1].trim()

  const hookFile = hooksFolder
    ? path.resolve(process.cwd(), hooksFolder, "commit-msg")
    : path.resolve(process.cwd(), ".git", "hooks", "commit-msg")

  const command = fs.existsSync("node_modules") ? "npx gramma" : appLocation

  const hookCode = getHookCode(command)

  if (fs.existsSync(hookFile)) {
    const content = fs.readFileSync(hookFile).toString()
    const alreadyExists = content.includes(hookCode[sys].partial)

    if (alreadyExists && !onlyCreate) {
      const newContent = content.replace(hookCode[sys].partial, "")
      fs.writeFileSync(hookFile, newContent)
      console.log(kleur.green("Hook removed!"))
    } else if (alreadyExists) {
      console.log(kleur.yellow("Hook already exists!"))
    } else {
      fs.appendFileSync(hookFile, hookCode[sys].partial)
      console.log(kleur.green("Hook created!"))
    }

    process.exit()
  }

  fs.writeFileSync(hookFile, hookCode[sys].full)
  fs.chmodSync(hookFile, "755")
  console.log(kleur.green("Hook created!"))
}

const hook = async (argv, cfg) => {
  const file =
    process.argv[process.argv.length - 1] !== "hook"
      ? process.argv[process.argv.length - 1]
      : null

  if (!file) {
    addHookCode()
    process.exit()
  }

  const initialText = fs.readFileSync(file).toString().replace(/#.*/g, "")

  const { changed, text } = await checkInteractively(initialText, cfg)

  if (changed) {
    await saveNow(text, file)
  }

  process.exit()
}

exports.addHookCode = addHookCode
exports.hook = hook
