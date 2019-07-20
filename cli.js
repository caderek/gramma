#!/usr/bin/env node
const yargs = require('yargs')
const fs = require('fs')
const check = require('./src/check')

yargs
  .command(
    'check [file]',
    'checks file for writing mistakes',
    (yargs) => {
      yargs.positional('text', {
        describe: 'file to check',
      })
    },
    (argv) => {
      if (argv.interactive) {
        console.info('Interactive mode is not yet available')
      }

      console.info(`👵🏻 OK dear, checking...`)

      const text = fs.readFileSync(argv.file).toString()

      check(text)
    },
  )
  .command(
    'listen [text]',
    'checks text for writing mistakes',
    (yargs) => {
      yargs.positional('text', {
        describe: 'text to check',
      })
    },
    (argv) => {
      console.log(`👵🏻 OK dear, checking...`)

      check(argv.text)
    },
  ).argv
