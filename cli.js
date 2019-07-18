#!/usr/bin/env node
const yargs = require('yargs')
const check = require('./check')

yargs
  .command(
    'check [text]',
    'checks text for writing mistakes',
    (yargs) => {
      yargs.positional('text', {
        describe: 'text to check',
      })
    },
    (argv) => {
      if (argv.interactive) {
        console.info('Interactive mode is not yet available')
      }

      console.log(argv.text)

      console.log(`👵🏻 Ok dear, checking...`)

      check(argv.text)
    },
  )
  .option('interactive', {
    alias: 'i',
    default: false,
  }).argv
