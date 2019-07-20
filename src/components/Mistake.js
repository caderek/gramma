const chalk = require('chalk')

const getMistakeColor = (type) =>
  type === 'grammar' ? 'red' : type === 'style' ? 'blue' : 'yellow'

const highlightMistake = (context, type, offset, length) => {
  const color = getMistakeColor(type)

  const before = context.slice(0, offset)
  const mistake = context.slice(offset, offset + length)
  const after = context.slice(offset + length)

  return `${before}${chalk[color](mistake)}${after}`
}

const Mistake = (mistake) => {
  const context = highlightMistake(
    mistake.context.text,
    mistake.rule.issueType,
    mistake.context.offset,
    mistake.context.length,
  )

  const replacements = mistake.replacements
    .map(
      (replacement, index) => `${index + 1}) ${chalk.green(replacement.value)}`,
    )
    .join('  ')

  const fixes =
    mistake.replacements.length > 0
      ? `${chalk.bold('Suggested fix:')} ${replacements}\n`
      : ''

  return (
    `-----------------------\n\n` +
    `${chalk.bold('Issue:')} ${mistake.rule.issueType}\n` +
    `${chalk.bold('Context:')} ${context}\n` +
    `${fixes}` +
    `${chalk.bold('Explanation:')} ${mistake.message}\n`
  )
}

module.exports = Mistake
