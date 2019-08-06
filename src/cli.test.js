const shell = require("shelljs")
const fs = require("fs")

const prepareData = (text) => {
  if (!fs.existsSync("test-temp")) {
    fs.mkdirSync("test-temp")
  }

  fs.writeFileSync("test-temp/example.txt", text)
}

const removeData = () => {
  shell.rm("-rf", "test-temp")
}

describe("'listen' command", () => {
  it("prints potential mistakes with '--print' option", () => {
    const result = shell.exec(
      "node src/cli.js listen --print 'There is a mistkae'",
    )

    expect(result.code).toEqual(1)
    expect(result.stderr).toEqual("")
    expect(result.grep("Context")).not.toEqual("")
    expect(result.grep("Suggested fix")).not.toEqual("")
  })

  it("prints potential mistakes with '-p' option", () => {
    const result = shell.exec("node src/cli.js listen -p 'There is a mistkae'")

    expect(result.code).toEqual(1)
    expect(result.stderr).toEqual("")
    expect(result.grep("Context")).not.toEqual("")
    expect(result.grep("Suggested fix")).not.toEqual("")
  })

  it("prints no mistakes with '--print' option", () => {
    const result = shell.exec(
      "node src/cli.js listen --print 'There are no mistakes'",
    )

    expect(result.code).toEqual(0)
    expect(result.stderr).toEqual("")
    expect(result.grep("No mistakes found!")).not.toEqual("")
  })

  it("prints no mistakes with '-p' option", () => {
    const result = shell.exec(
      "node src/cli.js listen -p 'There are no mistakes'",
    )

    expect(result.code).toEqual(0)
    expect(result.stderr).toEqual("")
    expect(result.grep("No mistakes found!")).not.toEqual("")
  })
})

describe("'check' command", () => {
  it("prints potential mistakes with '--print' option", () => {
    prepareData("There is a mistkae")
    const result = shell.exec(
      "node src/cli.js check --print test-temp/example.txt",
    )

    expect(result.code).toEqual(1)
    expect(result.stderr).toEqual("")
    expect(result.grep("Context")).not.toEqual("")
    expect(result.grep("Suggested fix")).not.toEqual("")
    removeData()
  })

  it("prints potential mistakes with '-p' option", () => {
    prepareData("There is a mistkae")
    const result = shell.exec("node src/cli.js check -p test-temp/example.txt")

    expect(result.code).toEqual(1)
    expect(result.stderr).toEqual("")
    expect(result.grep("Context")).not.toEqual("")
    expect(result.grep("Suggested fix")).not.toEqual("")
    removeData()
  })

  it("prints no mistakes with '--print' option", () => {
    prepareData("There are no mistakes")
    const result = shell.exec(
      "node src/cli.js check --print test-temp/example.txt",
    )

    expect(result.code).toEqual(0)
    expect(result.stderr).toEqual("")
    expect(result.grep("No mistakes found!")).not.toEqual("")
    removeData()
  })

  it("prints no mistakes with '-p' option", () => {
    prepareData("There are no mistakes")
    const result = shell.exec("node src/cli.js check -p test-temp/example.txt")

    expect(result.code).toEqual(0)
    expect(result.stderr).toEqual("")
    expect(result.grep("No mistakes found!")).not.toEqual("")
    removeData()
  })
})
