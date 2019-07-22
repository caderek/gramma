const kleur = require("kleur")
const stripStyles = require("./stripStyles")

describe("Strips styles from console string", () => {
  it("strips colors", () => {
    const input = kleur.red("foo")
    const expected = "foo"
    const result = stripStyles(input)

    expect(result).toEqual(expected)
  })

  it("strips background colors", () => {
    const input = kleur.bgRed("foo")
    const expected = "foo"
    const result = stripStyles(input)

    expect(result).toEqual(expected)
  })

  it("strips font style", () => {
    const input = kleur
      .bold()
      .italic()
      .underline()
      .strikethrough()
      .dim("foo")
    const expected = "foo"
    const result = stripStyles(input)

    expect(result).toEqual(expected)
  })
})
