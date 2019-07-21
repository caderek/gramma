#!/usr/bin/env node
const yargs = require("yargs")
const fs = require("fs")
const check = require("./src/check")

yargs
  .command(
    "check [file]",
    "checks file for writing mistakes",
    (yargs) => {
      yargs.positional("text", {
        describe: "file to check",
      })
    },
    (argv) => {
      console.info(`👵🏻 OK dear, checking...`)

      const text = fs.readFileSync(argv.file).toString()

      if (argv.print) {
        check(text)
      }

      check(text)
    },
  )
  .command(
    "listen [text]",
    "checks text for writing mistakes",
    (yargs) => {
      yargs.positional("text", {
        describe: "text to check",
      })
    },
    (argv) => {
      console.info(`👵🏻 OK dear, checking...`)

      if (argv.print) {
        check(argv.text)
      }

      check(argv.text)
    },
  )
  .command(
    "commit [text]",
    "git commit with grammar check",
    (yargs) => {
      yargs.positional("text", {
        describe: "commit message to check",
      })
    },
    (argv) => {
      console.info(`👵🏻 OK dear, checking...`)

      if (argv.print) {
        check(argv.text)
      }

      check(argv.text)
    },
  )
  .option("print", {
    alias: "p",
    default: false,
    describe: "Print mistakes non-interactively",
  })
  .alias("help", "h")
  .alias("version", "v").argv
