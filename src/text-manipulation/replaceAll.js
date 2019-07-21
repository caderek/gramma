const replace = require("./replace")

const replaceAll = (text, transformations) => {
  return transformations
    .sort((a, b) => a.offset < b.offset)
    .reduce((text, { change, offset, length }) => {
      return replace(text, change, offset, length)
    }, text)
}

module.exports = replaceAll
