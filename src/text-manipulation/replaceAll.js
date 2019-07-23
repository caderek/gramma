const replace = require("./replace")

const replaceAll = (text, transformations) => {
  return transformations
    .sort((a, b) => a.offset < b.offset)
    .reduce((previousText, { change, offset, length }) => {
      return replace(previousText, change, offset, length)
    }, text)
}

module.exports = replaceAll
