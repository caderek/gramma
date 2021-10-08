const kleur = require("kleur")
const fs = require("fs")
const path = require("path")
const os = require("os")
const checkInteractively = require("../actions/checkInteractively")
const saveNow = require("../actions/saveNow")
const appLocation = require("../utils/appLocation")

const sys = os.platform()

const hookCode = {
  linux: {
    full: `#!/bin/sh\n\nexec < /dev/tty\n\n${appLocation} hook $1\n`,
    partial: `\n\nexec < /dev/tty\n\n${appLocation} hook $1\n`,
  },
  darwin: {
    full: `#!/bin/sh\n\nexec < /dev/tty\n\n${appLocation} hook $1\n`,
    partial: `\n\nexec < /dev/tty\n\n${appLocation} hook $1\n`,
  },
  win32: {
    full: `#!/bin/sh\n\nexec < /dev/tty\n\n${appLocation} hook $1\n`.replace(
      /\\/g,
      "/",
    ),
    partial: `\n\nexec < /dev/tty\n\n${appLocation} hook $1\n`.replace(
      /\\/g,
      "/",
    ),
  },
}

const addHookCode = () => {
  const gitRoot = path.join(process.cwd(), ".git")
  const huskyRoot = path.join(process.cwd(), ".husky")
  const hasGit = fs.existsSync(gitRoot)
  const hasHusky = fs.existsSync(huskyRoot)

  if (!hasGit) {
    console.log(kleur.red("No .git in this directory"))
    process.exit(1)
  }

  const hookFile = hasHusky
    ? path.join(huskyRoot, "commit-msg")
    : path.join(gitRoot, "hooks", "commit-msg")

  if (fs.existsSync(hookFile)) {
    const content = fs.readFileSync(hookFile).toString()

    if (content.includes(hookCode[sys].partial)) {
      const newContent = content.replace(hookCode[sys].partial, "")
      fs.writeFileSync(hookFile, newContent)
      console.log(kleur.green("Hook removed!"))
    } else {
      fs.appendFileSync(hookFile, hookCode[sys].partial)
      console.log(kleur.green("Hook created!"))
    }

    process.exit()
  }

  fs.writeFileSync(hookFile, hookCode[sys].full)
  fs.chmodSync(hookFile, "755")
  console.log(kleur.green("Hook created!"))
  process.exit()
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

  const initialText = fs.readFileSync(file).toString()

  const { changed, text } = await checkInteractively(initialText, cfg)

  if (changed) {
    await saveNow(text, file)
  }

  process.exit()
}

module.exports = hook
