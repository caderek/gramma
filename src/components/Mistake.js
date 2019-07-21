const kleur = require("kleur")
const replace = require("../text-manipulation/replace")

const getMistakeColor = (type) =>
  type === "grammar" ? "red" : type === "style" ? "blue" : "yellow"

const highlightMistake = (context, type, offset, length) => {
  const color = getMistakeColor(type)
  const change = (mistake) => kleur[color](mistake)

  return replace(context, change, offset, length)
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
      (replacement, index) => `${index + 1}) ${kleur.green(replacement.value)}`,
    )
    .join("  ")

  const fixes =
    mistake.replacements.length > 0
      ? `${kleur.bold("Suggested fix:")} ${replacements}\n`
      : ""

  return (
    `-----------------------\n\n` +
    `${kleur.bold("Issue:")} ${mistake.rule.issueType}\n` +
    `${kleur.bold("Context:")} ${context}\n` +
    `${fixes}` +
    `${kleur.bold("Explanation:")} ${mistake.message}\n`
  )
}

module.exports = Mistake
