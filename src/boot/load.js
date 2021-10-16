const prepareConfig = require("./prepareConfig")

const load = (action) => (argv) => {
  if (argv.file && argv.file.endsWith(".md")) {
    argv.markdown = true // eslint-disable-line
  }

  const cfg = prepareConfig(argv)
  action(argv, cfg)
}

module.exports = load
