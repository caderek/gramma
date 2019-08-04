const prepareConfig = require("./prepareConfig")

const load = (action) => (argv) => {
  const config = prepareConfig(argv)
  action(argv, config)
}

module.exports = load
