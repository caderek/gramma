const deepEqual = require("assert").deepEqual

const equal = (a, b) => {
  try {
    deepEqual(a, b)
    return true
  } catch (e) {
    return false
  }
}

module.exports = equal
