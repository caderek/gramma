const prepareConfig = require("./prepareConfig")
const context = require("../context")

const load = (action) => (argv) => {
  context.argv = argv
  const cfg = prepareConfig(argv)
  action(argv, cfg)
}

module.exports = load
