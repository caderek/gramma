#!/usr/bin/env node
const yargs = require("yargs")
const { version } = require("../package")
const load = require("./boot/load")

const check = require("./commands/check")
const listen = require("./commands/listen")
const commit = require("./commands/commit")
const init = require("./commands/init")
const config = require("./commands/config")
const paths = require("./commands/paths")
const server = require("./commands/server")

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
  })
  .option("disable", {
    alias: "d",
    type: "string",
    describe: "Disable specific rule",
    default: [],
  })
  .option("enable", {
    alias: "e",
    type: "string",
    describe: "Enable specific rule",
    default: [],
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
  .demandCommand().argv
