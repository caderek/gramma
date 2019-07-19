const checkViaAPI = require('./checkViaAPI')
const chalk = require('chalk')

const highlightMistake = (context, type, offset, length) => {
  const color =
    type === 'grammar' ? 'red' : type === 'style' ? 'blue' : 'yellow'
  const before = context.slice(0, offset)
  const mistake = context.slice(offset, offset + length)
  const after = context.slice(offset + length)

  return `${before}${chalk[color](mistake)}${after}`
}

const print = (result) => {
  if (result.matches.length === 0) {
    console.log(chalk.green('No mistakes found!'))
  } else {
    console.log(`Found ${result.matches.length} potential mistakes`)
    result.matches.forEach((match) => {
      const context = highlightMistake(
        match.context.text,
        match.rule.issueType,
        match.context.offset,
        match.context.length,
      )

      const replacements = match.replacements
        .map(
          (replacement, index) =>
            `${index + 1}) ${chalk.green(replacement.value)}`,
        )
        .join('  ')

      console.log(`-----------------------\n`)
      console.log(`${chalk.bold('Issue:')} ${match.rule.issueType}`)
      console.log(`${chalk.bold('Context:')} ${context}`)
      if (match.replacements.length > 0) {
        console.log(`${chalk.bold('Suggested fix:')} ${replacements}`)
      }
      console.log(`${chalk.bold('Explanation:')} ${match.message}\n`)
    })
  }
}

const check = (text) => {
  checkViaAPI(text).then(print)
}

// const text = fs.readFileSync('./example.md').toString()

// check(text)

module.exports = check
