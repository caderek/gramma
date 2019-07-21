const prompts = require("prompts")

const initialFileName = (originalFile) => {
  const date = new Date().toISOString()

  return originalFile ? `${date}-${originalFile}` : `${date}-gramma.txt`
}

const handleSave = (mode, originalFile = null) => {
  const choices = [
    ...(mode === "FILE" ? [{ title: "replace file", value: "replace" }] : []),
    { title: "save as", value: "save-as" },
    { title: "print on screen", value: "print" },
  ]

  const initialInput = mode === "FILE" ? 0 : 1

  return prompts([
    {
      type: "select",
      name: "saveOption",
      message: "What do you want to do?",
      initial: initialInput,
      choices,
    },
    {
      type: (prev) => (prev === "save-as" ? "text" : null),
      name: "fileName",
      initial: initialFileName(originalFile),
      message: "Chose file name",
    },
  ])
}

const main = async () => {
  const result = await handleSave("TEXT")

  console.log(result)
}

main()

module.exports = handleSave
