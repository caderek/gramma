const stripStyles = require("../utils/stripStyles")
const Mistake = require("./Mistake")

describe("Mistake component", () => {
  it("renders info about mistake without suggestions", () => {
    const expected =
      `-----------------------\n\n` +
      `Issue: non-conformance\n` +
      `Context:  It are a perfect English sentence. \n` +
      `Explanation: Did you mean "is"?\n`

    const result = Mistake({
      message: 'Did you mean "is"?',
      replacements: [],
      context: {
        text: " It are a perfect English sentence. ",
        offset: 4,
        length: 3,
      },
      rule: {
        issueType: "non-conformance",
      },
    })

    const rawResult = stripStyles(result)

    expect(rawResult).toEqual(expected)
  })

  it("renders info about mistake with single suggestion", () => {
    const expected =
      `-----------------------\n\n` +
      `Issue: grammar\n` +
      `Context: Some context\n` +
      `Suggested fix: 1) foo\n` +
      `Explanation: Some message\n`

    const result = Mistake({
      message: "Some message",
      replacements: [{ value: "foo" }],
      context: {
        text: "Some context",
        offset: 4,
        length: 3,
      },
      rule: {
        issueType: "grammar",
      },
    })

    const rawResult = stripStyles(result)

    expect(rawResult).toEqual(expected)
  })

  it("renders info about mistake with multiple suggestions", () => {
    const expected =
      `-----------------------\n\n` +
      `Issue: style\n` +
      `Context: Some context\n` +
      `Suggested fix: 1) foo  2) bar  3) baz\n` +
      `Explanation: Some message\n`

    const result = Mistake({
      message: "Some message",
      replacements: [{ value: "foo" }, { value: "bar" }, { value: "baz" }],
      context: {
        text: "Some context",
        offset: 4,
        length: 3,
      },
      rule: {
        issueType: "style",
      },
    })

    const rawResult = stripStyles(result)

    expect(rawResult).toEqual(expected)
  })
})
