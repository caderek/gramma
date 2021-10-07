const kleur = require("kleur")
const fs = require("fs")
const path = require("path")
const os = require("os")
const checkInteractively = require("../actions/checkInteractively")
const saveNow = require("../actions/saveNow")
const appLocation = require("../utils/appLocation")

const hookCode = {
  sh: {
    full: `#!/bin/sh\n\nexec < /dev/tty\n\n${appLocation} hook $1`,
    partial: `\n\nexec < /dev/tty\n\n${appLocation} hook $1`,
  },
}

const addHookCode = () => {
  const gitRoot = path.join(process.cwd(), ".git")
  const hasGitRoot = fs.existsSync(gitRoot)

  if (!hasGitRoot) {
    console.log(kleur.red("No .git in this directory"))
    process.exit(1)
  }

  if (os.platform === "win32") {
    console.log(kleur.red("Command not supported on Windows"))
    process.exit(1)
  }

  const hookFile = path.join(gitRoot, "hooks", "commit-msg")
  // Add hook
  if (fs.existsSync(hookFile)) {
    const content = fs.readFileSync(hookFile).toString()

    if (content.includes(hookCode.sh.partial)) {
      console.log(kleur.yellow("Hook already exists"))
    } else {
      fs.appendFileSync(hookFile, hookCode.sh.partial)
      console.log(kleur.green("Hook created!"))
    }

    process.exit()
  }

  fs.writeFileSync(hookFile, hookCode.sh.full)
  console.log(kleur.green("Hook created!"))
  process.exit()
}

const hook = async (argv, cfg) => {
  if (!argv.file) {
    addHookCode()
    process.exit()
  }

  const initialText = fs.readFileSync(argv.file).toString()

  const { changed, text } = await checkInteractively(initialText, cfg)

  if (changed) {
    await saveNow(text, argv.file)
  }

  process.exit()
}

module.exports = hook
