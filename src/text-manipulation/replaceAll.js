const replace = require("./replace")

/**
 * @param {string} text base text
 * @param {Object[]} transformations descriptions of changes to the text
 */
const replaceAll = (text, transformations) => {
  return transformations
    .sort((a, b) => a.offset < b.offset)
    .reduce((previousText, { change, offset, length }) => {
      return replace(previousText, change, offset, length)
    }, text)
}

module.exports = replaceAll
