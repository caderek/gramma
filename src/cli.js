#!/usr/bin/env node
const yargs = require("yargs")
const { version } = require("../package")
const languages = require("../data/languages.json")
const rules = require("../data/rules.json")
const load = require("./boot/load")

const debug = require("./commands/debug")
const check = require("./commands/check")
const listen = require("./commands/listen")
const commit = require("./commands/commit")
const init = require("./commands/init")
const config = require("./commands/config")
const paths = require("./commands/paths")
const server = require("./commands/server")
const pipe = require("./commands/pipe")

const languagesOptions = languages.map((item) => item.longCode)
const rulesOptions = rules.map((rule) => rule.id.toLowerCase())

// eslint-disable-next-line no-unused-expressions
yargs
  .command(
    "check [file]",
    "checks file for writing mistakes",
    (yargsCtx) => {
      yargsCtx.positional("text", {
        describe: "file to check",
      })
    },
    load(check),
  )
  .command(
    "listen [text]",
    "checks text for writing mistakes",
    (yargsCtx) => {
      yargsCtx.positional("text", {
        describe: "text to check",
      })
    },
    load(listen),
  )
  .command(
    "commit [text]",
    "git commit -m with grammar check",
    (yargsCtx) => {
      yargsCtx.positional("text", {
        describe: "commit message to check",
      })
    },
    load(commit),
  )
  .command(
    "init",
    "creates local config with empty dictionary",
    () => {},
    load(init),
  )
  .command("debug", "debug", {}, load(debug))
  .command(
    "config [key] [value]",
    "sets config entries",
    (yargsCtx) => {
      yargsCtx
        .positional("key", {
          describe: "name of the config entry",
        })
        .positional("value", {
          describe: "value of the config entry",
        })
    },
    load(config),
  )
  .command("paths", "show paths used by Gramma", () => {}, load(paths))
  .command(
    "server [action]",
    "manages local API server",
    (yargsCtx) => {
      yargsCtx.positional("action", {
        describe: "action to take (start / stop / pid)",
      })
    },
    load(server),
  )
  .command("$0", "check from I/O stream", () => {}, load(pipe))
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
  .option("language", {
    alias: "l",
    type: "string",
    default: "config",
    describe: "Sets the language of the text",
    choices: ["config", "auto", ...languagesOptions],
  })
  .option("disable", {
    alias: "d",
    type: "string",
    describe: "Disables specific rule",
    choices: rulesOptions,
    default: [],
  })
  .option("enable", {
    alias: "e",
    type: "string",
    describe: "Enables specific rule",
    choices: rulesOptions,
    default: [],
  })
  .alias("help", "h")
  .version(`v${version}`)
  .alias("version", "v")
  .showHelpOnFail(false, "Specify --help or -h for available options")
  .demandCommand().argv
