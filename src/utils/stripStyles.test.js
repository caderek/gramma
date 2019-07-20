const stripStyles = require("./stripStyles")
const chalk = require("chalk")

describe("Strips styles from console string", () => {
  it("strips colors", () => {
    const input = chalk.red("foo")
    const expected = "foo"
    const result = stripStyles(input)

    expect(result).toEqual(expected)
  })

  it("strips background colors", () => {
    const input = chalk.bgRed("foo")
    const expected = "foo"
    const result = stripStyles(input)

    expect(result).toEqual(expected)
  })

  it("strips font style", () => {
    const input = chalk.bold.italic.underline.strikethrough.dim("foo")
    const expected = "foo"
    const result = stripStyles(input)

    expect(result).toEqual(expected)
  })
})
