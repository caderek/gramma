#!/usr/bin/env node
const yargs = require("yargs")
const fs = require("fs")
const { execSync } = require("child_process")
const intercept = require("intercept-stdout")
const check = require("./commands/check")
const checkInteractively = require("./commands/checkInteractively")
const save = require("./commands/save")
const configure = require("./commands/configure")
const stripStyles = require("./utils/stripStyles")
const config = require("./config")

// eslint-disable-next-line no-unused-expressions
yargs
  .command(
    "*",
    "check from I/O stream",
    () => {},
    async () => {
      const data = await new Promise((resolve) => {
        process.stdin.on("data", resolve)
      })

      const initialText = data.toString()

      intercept(stripStyles)
      const status = await check(initialText, config.session.dictionary, false)
      process.exit(status)
    },
  )
  .command(
    "check [file]",
    "checks file for writing mistakes",
    (yargsCtx) => {
      yargsCtx.positional("text", {
        describe: "file to check",
      })
    },
    async (argv) => {
      console.info(`👵🏻 OK dear, checking...`)

      const initialText = fs.readFileSync(argv.file).toString()

      if (argv.print) {
        const status = await check(initialText, config.session.dictionary)
        process.exit(status)
      } else {
        const { changed, text } = await checkInteractively(
          initialText,
          config.session.dictionary,
        )
        if (changed) {
          save(text, "FILE", argv.file)
        }
      }
    },
  )
  .command(
    "listen [text]",
    "checks text for writing mistakes",
    (yargsCtx) => {
      yargsCtx.positional("text", {
        describe: "text to check",
      })
    },
    async (argv) => {
      console.info(`👵🏻 OK dear, checking...`)

      if (argv.print) {
        const status = await check(argv.text, config.session.dictionary)
        process.exit(status)
      } else {
        const { changed, text } = await checkInteractively(
          argv.text,
          config.session.dictionary,
        )
        if (changed) {
          save(text, "TEXT")
        }
      }
    },
  )
  .command(
    "commit [text]",
    "git commit -m with grammar check",
    (yargsCtx) => {
      yargsCtx.positional("text", {
        describe: "commit message to check",
      })
    },
    async (argv) => {
      console.info(`👵🏻 OK dear, checking...`)

      const { text } = await checkInteractively(
        argv.text,
        config.session.dictionary,
      )

      try {
        const output = argv.all
          ? execSync(`git commit -am "${text}"`)
          : execSync(`git commit -m "${text}"`)

        process.stdout.write(output)
      } catch (error) {
        process.stderr.write(error.stdout)
      }
    },
  )
  .command(
    "init",
    "creates local config with empty dictionary",
    () => {},
    async () => {
      const localConfig = JSON.stringify(
        {
          dictionary: [],
        },
        null,
        2,
      )
      if (!fs.existsSync(config.paths.localConfigFile)) {
        fs.writeFileSync(config.paths.localConfigFile, localConfig)
      }
    },
  )
  .command(
    "config [key] [value]",
    "configures Gramma",
    (yargsCtx) => {
      yargsCtx
        .positional("key", {
          describe: "name of the config entry",
        })
        .positional("value", {
          describe: "value of the config entry",
        })
    },
    async (argv) => {
      configure(argv.key, argv.value, argv.global)
      console.log("Done!")
    },
  )
  .command(
    "paths",
    "show paths used by Gramma",
    () => {},
    () => {
      console.log(`Global config: ${config.paths.globalConfigFile}`)
      console.log(`App location:  ${__dirname}`)
    },
  )
  .option("print", {
    alias: "p",
    type: "boolean",
    default: false,
    describe: "Print mistakes non-interactively",
  })
  .option("all", {
    alias: "a",
    type: "boolean",
    default: false,
    describe: "Adds -a flag to git commit command",
  })
  .option("global", {
    alias: "g",
    type: "boolean",
    default: false,
    describe: "When used with 'config' command uses global config",
  })
  .alias("help", "h")
  .alias("version", "v")
  .demandCommand().argv
