const replaceAll = require("./replaceAll")

describe("Replace all", () => {
  it("changes all places according to provided transformations", () => {
    const text = "Foo CHANGE_ONE baz CHANGE_TWO."
    const transformations = [
      {
        offset: 4,
        length: 10,
        change: "bar",
      },
      {
        offset: 19,
        length: 10,
        change: "bat",
      },
    ]

    const expected = "Foo bar baz bat."
    const result = replaceAll(text, transformations)

    expect(result).toEqual(expected)
  })
})
