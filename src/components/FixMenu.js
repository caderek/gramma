const kleur = require("kleur")

const FixOptions = (fixes) => {
  if (fixes.length === 0) {
    return ""
  }
  if (fixes.length === 1) {
    return kleur.bold().green("1") + kleur.reset(`: fix\n`)
  }
  return kleur.bold().green(`1-${fixes.length}`) + kleur.reset(`: chose fix\n`)
}

const FixMenu = (fixes, issue) => {
  const defaultFix = kleur.bold().green(fixes.length > 0 ? 1 : 0)

  // prettier-ignore
  const dictionaryOptions =
    issue === "misspelling"
      ? `${kleur.bold().green("l")
        }${kleur.reset(`: add to local dictionary\n`)
        }${kleur.bold().green("g")
        }${kleur.reset(`: add to global dictionary\n`)}`
      : ""

  // prettier-ignore
  return (
    `What do you want to do?\n${ 
    kleur.bold().green("Enter") 
    }${kleur.reset(`: default (${defaultFix})\n`) 
    }${FixOptions(fixes) 
    }${kleur.bold().green("0") 
    }${kleur.reset(`: custom fix\n`) 
    }${kleur.bold().green("i") 
    }${kleur.reset(`: ignore\n`) 
    }${dictionaryOptions
    }${kleur.bold().green("n") 
    }${kleur.reset(`: next\n`)}`
  )
}

module.exports = FixMenu
