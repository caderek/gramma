const replace = (text, change, offset, length) => {
  const before = text.slice(0, offset)
  const mistake = text.slice(offset, offset + length)
  const after = text.slice(offset + length)

  const newPhrase = typeof change === "function" ? change(mistake) : change

  return `${before}${newPhrase}${after}`
}

module.exports = replace
