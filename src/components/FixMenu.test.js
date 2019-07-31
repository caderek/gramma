const stripStyles = require("../utils/stripStyles")
const FixMenu = require("./FixMenu")

describe("FixMenu component", () => {
  it("renders menu with multiple fix propositions for mistake", () => {
    const expected =
      "What do you want to do?\n" +
      "Enter: default (1)\n" +
      "1-3: chose fix\n" +
      "0: custom fix\n" +
      "i: ignore\n" +
      "n: next\n"

    const result = FixMenu([{}, {}, {}])

    const rawResult = stripStyles(result)

    expect(rawResult).toEqual(expected)
  })

  it("renders menu with single fix proposition for mistake", () => {
    const expected =
      "What do you want to do?\n" +
      "Enter: default (1)\n" +
      "1: fix\n" +
      "0: custom fix\n" +
      "i: ignore\n" +
      "n: next\n"

    const result = FixMenu([{}])

    const rawResult = stripStyles(result)

    expect(rawResult).toEqual(expected)
  })

  it("renders menu with no fix propositions for mistake", () => {
    const expected =
      "What do you want to do?\n" +
      "Enter: default (0)\n" +
      "0: custom fix\n" +
      "i: ignore\n" +
      "n: next\n"

    const result = FixMenu([])

    const rawResult = stripStyles(result)

    expect(rawResult).toEqual(expected)
  })

  it("renders dictionary options on spelling mistake", () => {
    const expected =
      "What do you want to do?\n" +
      "Enter: default (0)\n" +
      "0: custom fix\n" +
      "i: ignore\n" +
      "l: add to local dictionary\n" +
      "g: add to global dictionary\n" +
      "n: next\n"

    const result = FixMenu([], "misspelling")

    const rawResult = stripStyles(result)

    expect(rawResult).toEqual(expected)
  })
})
