const kleur = require("kleur")
const fs = require("fs")
const path = require("path")
const os = require("os")
const { execSync } = require("child_process")
const checkInteractively = require("../actions/checkInteractively")
const saveNow = require("../actions/saveNow")
const appLocation = require("../utils/appLocation")

const sys = os.platform()

const REDIRECT_STDIN = "\n\nexec < /dev/tty"

const getHookCode = (command, stdin = true) => {
  const stdinCode = stdin ? REDIRECT_STDIN : ""

  return {
    linux: {
      full: `#!/bin/sh${stdinCode}\n\n${command}\n`,
      partial: `${stdinCode}\n\n${command}\n`,
    },
    darwin: {
      full: `#!/bin/sh${stdinCode}\n\n${command}\n`,
      partial: `${stdinCode}\n\n${command}\n`,
    },
    win32: {
      full: `#!/bin/sh${stdinCode}\n\n${command}\n`.replace(/\\/g, "/"),
      partial: `${stdinCode}\n\n${command}\n`.replace(/\\/g, "/"),
    },
  }
}

const gitRoot = path.join(process.cwd(), ".git")

const checkGit = () => {
  return fs.existsSync(gitRoot)
}

const createEmptyFile = (file) => {
  if (!fs.existsSync(file)) {
    fs.closeSync(fs.openSync(file, "w"))
  }
}

const addHookCode = (hookFile, hookCode, onlyCreate, name) => {
  if (fs.existsSync(hookFile)) {
    const content = fs.readFileSync(hookFile).toString()
    const alreadyExists = content.includes(hookCode[sys].partial)

    if (alreadyExists && !onlyCreate) {
      const newContent = content.replace(hookCode[sys].partial, "")
      fs.writeFileSync(hookFile, newContent)
      console.log(kleur.green(`Hook (${name}) removed!`))
    } else if (alreadyExists) {
      console.log(kleur.yellow(`Hook (${name}) already exists!`))
    } else {
      fs.appendFileSync(hookFile, hookCode[sys].partial)
      console.log(kleur.green(`Hook (${name}) created!`))
    }
  } else {
    fs.writeFileSync(hookFile, hookCode[sys].full)
    fs.chmodSync(hookFile, "755")
    console.log(kleur.green(`Hook (${name}) created!`))
  }
}

const addHooksCode = (onlyCreate = false) => {
  const hasGit = checkGit()

  if (!hasGit) {
    console.log(kleur.red("No .git in this directory"))
    process.exit(1)
  }

  const hooksConfig = fs
    .readFileSync(path.join(gitRoot, "config"))
    .toString()
    .match(/hooksPath *=.*/gi)

  const hooksFolder = hooksConfig && hooksConfig[0].split("=")[1].trim()

  const hookFileCommitMsg = hooksFolder
    ? path.resolve(process.cwd(), hooksFolder, "commit-msg")
    : path.resolve(process.cwd(), ".git", "hooks", "commit-msg")

  const hookFilePostCommit = hooksFolder
    ? path.resolve(process.cwd(), hooksFolder, "post-commit")
    : path.resolve(process.cwd(), ".git", "hooks", "post-commit")

  const commandCommitMsg = fs.existsSync("node_modules")
    ? "npx gramma hook $1"
    : `${appLocation} hook $1`

  const commandPostCommit = fs.existsSync("node_modules")
    ? "npx gramma hook cleanup"
    : `${appLocation} hook cleanup`

  const hookCodeCommitMsg = getHookCode(commandCommitMsg)
  const hookCodePostCommit = getHookCode(commandPostCommit, false)

  addHookCode(hookFileCommitMsg, hookCodeCommitMsg, onlyCreate, "commit-msg")
  addHookCode(hookFilePostCommit, hookCodePostCommit, onlyCreate, "post-commit")
}

const hook = async (argv, cfg) => {
  const arg =
    process.argv[process.argv.length - 1] !== "hook"
      ? process.argv[process.argv.length - 1]
      : null

  // No arg - execute the default command
  if (!arg) {
    addHooksCode()
    process.exit()
  }

  // Temporary file to coordinate git hooks
  // See: https://stackoverflow.com/a/12802592/4713502
  const tempFile = path.join(cfg.paths.globalConfigDir, ".commit")

  // Code executed by `post-commit` hook
  if (arg === "cleanup") {
    if (cfg.paths.localConfigFile && fs.existsSync(tempFile)) {
      fs.unlinkSync(tempFile)

      try {
        execSync(`git add ${cfg.paths.localConfigFile}`)
        execSync(`git commit --amend --no-edit --no-verify`)
      } catch (e) {} // eslint-disable-line
    }

    process.exit()
  }

  // Code executed by `commit-msg` hook
  createEmptyFile(tempFile)

  const file = arg

  const commitText = fs
    .readFileSync(file)
    .toString()
    .replace(/# ------------------------ >8[\S\s]*/m, "") // Remove diff part on --verbose
    .replace(/#.*/g, "") // Remove other comments

  const { changed, text } = await checkInteractively(commitText, cfg)

  if (changed) {
    await saveNow(text, file)
  }

  process.exit()
}

exports.checkGit = checkGit
exports.addHookCode = addHooksCode
exports.hook = hook
