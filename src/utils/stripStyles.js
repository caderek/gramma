/**
 * Strips terminal styles from string
 * (colors, weight etc.)
 *
 * @param {string} text any string
 */
const stripStyles = (text) => {
  // eslint-disable-next-line no-control-regex
  const regex = /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g

  return text.replace(regex, "")
}

module.exports = stripStyles
