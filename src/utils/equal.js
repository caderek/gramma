const { deepEqual } = require("assert")

const equal = (a, b) => {
  try {
    deepEqual(a, b)
    return true
  } catch (e) {
    return false
  }
}

module.exports = equal
