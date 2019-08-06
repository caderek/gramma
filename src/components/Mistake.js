const kleur = require("kleur")
const replace = require("../text-manipulation/replace")

const getMistakeColor = (type) => {
  if (type === "grammar") {
    return "red"
  }

  if (type === "style") {
    return "blue"
  }

  return "yellow"
}

const highlightMistake = (context, type, offset, length) => {
  const color = getMistakeColor(type)
  const change = (mistake) => kleur[color](mistake)

  return replace(context, change, offset, length)
}

const Mistake = (match, style = true) => {
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

  const word = style ? "" : `Word: ${match.word}\n`

  // prettier-ignore
  return (
    `---------------------------------\n\n${
    kleur.dim(`${kleur.bold("Rule:")} ${match.rule.category.id.toLowerCase()}\n`)
    }${kleur.dim(`${kleur.bold("Explanation:")} ${match.message}\n\n`)
    }${word
    }${kleur.bold("Context:")} ${context}\n${
    fixes}`
  )
}

module.exports = Mistake
