const prompts = require("prompts")
const { platform } = require("os")

const initialFileName = (originalFile) => {
  const date =
    platform() === "win32"
      ? new Date().toISOString().replace(/[.:-]/g, "")
      : new Date().toISOString()

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
      message: "Please provide a file path",
    },
  ])
}

module.exports = handleSave
