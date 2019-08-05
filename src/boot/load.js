const prepareConfig = require("./prepareConfig")

const load = (action) => (argv) => {
  const cfg = prepareConfig(argv)
  action(argv, cfg)
}

module.exports = load
