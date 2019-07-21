const kleur = require("kleur")

const FixOptions = (fixes) => {
  if (fixes.length === 0) {
    return ""
  } else if (fixes.length === 1) {
    return kleur.bold().green("1") + kleur.reset(`: fix\n`)
  } else {
    return (
      kleur.bold().green(`1-${fixes.length}`) + kleur.reset(`: chose fix\n`)
    )
  }
}

const FixMenu = (fixes) => {
  return (
    "What do you want to do?\n" +
    kleur.bold().green("Enter") +
    kleur.reset(
      `: default (${kleur.bold().green(fixes.length > 0 ? 1 : 0)})\n`,
    ) +
    FixOptions(fixes) +
    kleur.bold().green("0") +
    kleur.reset(`: custom fix\n`) +
    kleur.bold().green("i") +
    kleur.reset(`: ignore\n`) +
    kleur.bold().green("n") +
    kleur.reset(`: next\n`)
  )
}

module.exports = FixMenu
