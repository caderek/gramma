#!/usr/bin/env node
require("dotenv").config()

const yargs = require("yargs")
const { version } = require("../package.json")
const load = require("./boot/load")

const check = require("./commands/check")
const listen = require("./commands/listen")
const commit = require("./commands/commit")
const init = require("./commands/init")
const config = require("./commands/config")
const paths = require("./commands/paths")
const server = require("./commands/server")
const { hook } = require("./commands/hook")

const { languageOptions } = require("./validators/languages")
const { ruleOptions } = require("./validators/rules")

// eslint-disable-next-line no-unused-expressions
yargs
  .command(
    "check <file>",
    "check file for writing mistakes",
    (yargsCtx) => {
      yargsCtx.positional("text", {
        describe: "file to check",
      })
    },
    load(check),
  )
  .command(
    "listen <text>",
    "check text for writing mistakes",
    (yargsCtx) => {
      yargsCtx.positional("text", {
        describe: "text to check",
      })
    },
    load(listen),
  )
  .command(
    "commit <text>",
    "git commit -m with grammar check",
    (yargsCtx) => {
      yargsCtx.positional("text", {
        describe: "commit message to check",
      })
    },
    load(commit),
  )
  .command(
    "hook",
    "toggles Git hook",
    (yargsCtx) => {
      yargsCtx.positional("text", {
        describe: "commit message file",
      })
    },
    load(hook),
  )
  .command(
    "init",
    "create local config with default settings",
    () => {},
    load(init),
  )
  .command(
    "config <key> <value>",
    "set config entry",
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
    "server <action>",
    "manage local API server",
    (yargsCtx) => {
      yargsCtx.positional("action", {
        describe: "action to take (install / start / stop / pid / gui)",
      })
    },
    load(server),
  )
  .alias("help", "h")
  .version(`v${version}`)
  .alias("version", "v")
  .hide("paths")
  .option("print", {
    alias: "p",
    type: "boolean",
    default: false,
    describe: "Print mistakes non-interactively",
  })
  .option("no-colors", {
    alias: "n",
    type: "boolean",
    default: false,
    describe: "Disable output colors",
  })
  .option("language", {
    alias: "l",
    type: "string",
    default: "config",
    describe: "Set the language of the text",
    choices: languageOptions,
  })
  .option("disable", {
    alias: "d",
    type: "string",
    describe: "Disable specific rule",
    default: [],
    choices: ruleOptions,
  })
  .option("enable", {
    alias: "e",
    type: "string",
    describe: "Enable specific rule",
    default: [],
    choices: ruleOptions,
  })
  .option("all", {
    alias: "a",
    type: "boolean",
    default: false,
    describe: "Add -a flag to git commit command",
  })
  .option("global", {
    alias: "g",
    type: "boolean",
    default: false,
    describe: "Use global configuration file with 'config' command",
  })
  .option("markdown", {
    alias: "m",
    type: "boolean",
    default: false,
    describe: "Treat the text as markdown",
  })
  .option("port", {
    type: "number",
    describe: "Set the port number of local API server",
  })
  .demandCommand().argv
