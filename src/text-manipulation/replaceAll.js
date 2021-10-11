const replace = require("./replace")

/**
 * Modifies provided text with specified transformations.
 *
 * @param text base text
 * @param transformations descriptions of changes to the text
 */
const replaceAll = (text, transformations) => {
  return transformations
    .sort((a, b) => b.offset - a.offset)
    .reduce((previousText, { change, offset, length }) => {
      return replace(previousText, change, offset, length)
    }, text)
}

module.exports = replaceAll
