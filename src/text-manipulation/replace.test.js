const replace = require("./replace")

describe("Replace", () => {
  it("changes specified part of the text with provides word/phrase", () => {
    const text = "Foo CHANGE_ME baz."
    const change = "bar"
    const offset = 4
    const length = 9

    const expected = "Foo bar baz."
    const result = replace(text, change, offset, length)

    expect(result).toEqual(expected)
  })

  it("changes specified part of the text according to provided function", () => {
    const text = "Foo CHANGE_ME baz."
    const change = (mistake) => mistake.toLowerCase()
    const offset = 4
    const length = 9

    const expected = "Foo change_me baz."
    const result = replace(text, change, offset, length)

    expect(result).toEqual(expected)
  })
})
