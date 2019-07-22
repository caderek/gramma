const kleur = require("kleur")
const replace = require("../text-manipulation/replace")

const getMistakeColor = (type) =>
  type === "grammar" ? "red" : type === "style" ? "blue" : "yellow"

const highlightMistake = (context, type, offset, length) => {
  const color = getMistakeColor(type)
  const change = (mistake) => kleur[color](mistake)

  return replace(context, change, offset, length)
}

const Mistake = (match) => {
  const context = highlightMistake(
    match.context.text,
    match.rule.issueType,
    match.context.offset,
    match.context.length,
  )

  const replacements = match.replacements
    .map(
      (replacement, index) =>
        `${kleur.bold().green(index + 1)}) ${replacement.value}`,
    )
    .join("  ")

  const fixes =
    match.replacements.length > 0
      ? `${kleur.bold("Suggested fix:")} ${replacements}\n`
      : ""

  return (
    `---------------------------------\n\n${ 
    kleur.dim(`${kleur.bold("Issue:")} ${match.rule.issueType}\n`) 
    }${kleur.dim(`${kleur.bold("Explanation:")} ${match.message}\n\n`) 
    }${kleur.bold("Context:")} ${context}\n` +
    `${fixes}`
  )
}

module.exports = Mistake
