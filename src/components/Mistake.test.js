const stripStyles = require("../utils/stripStyles")
const Mistake = require("./Mistake")

describe("Mistake component", () => {
  it("renders info about mistake without suggestions", () => {
    const expected =
      `---------------------------------\n\n` +
      `Rule: typos\n` +
      `Explanation: Did you mean "is"?\n\n` +
      `Context:  It are a perfect English sentence. \n`

    const result = Mistake({
      message: 'Did you mean "is"?',
      replacements: [],
      context: {
        text: " It are a perfect English sentence. ",
        offset: 4,
        length: 3,
      },
      rule: {
        category: {
          id: "typos",
        },
      },
    })

    const rawResult = stripStyles(result)

    expect(rawResult).toEqual(expected)
  })

  it("renders info about mistake with single suggestion", () => {
    const expected =
      `---------------------------------\n\n` +
      `Rule: typos\n` +
      `Explanation: Some message\n\n` +
      `Context: Some context\n` +
      `Suggested fix: 1) foo\n`

    const result = Mistake({
      message: "Some message",
      replacements: [{ value: "foo" }],
      context: {
        text: "Some context",
        offset: 4,
        length: 3,
      },
      rule: {
        category: {
          id: "typos",
        },
      },
    })

    const rawResult = stripStyles(result)

    expect(rawResult).toEqual(expected)
  })

  it("renders info about mistake with multiple suggestions", () => {
    const expected =
      `---------------------------------\n\n` +
      `Rule: typos\n` +
      `Explanation: Some message\n\n` +
      `Context: Some context\n` +
      `Suggested fix: 1) foo  2) bar  3) baz\n`

    const result = Mistake({
      message: "Some message",
      replacements: [{ value: "foo" }, { value: "bar" }, { value: "baz" }],
      context: {
        text: "Some context",
        offset: 4,
        length: 3,
      },
      rule: {
        category: {
          id: "typos",
        },
      },
    })

    const rawResult = stripStyles(result)

    expect(rawResult).toEqual(expected)
  })
})
