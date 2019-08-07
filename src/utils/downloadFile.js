const fs = require("fs")
const fetch = require("node-fetch")
const progressStream = require("progress-stream")
const cliProgress = require("cli-progress")

const toMegabytes = (bytes) => {
  return Number((bytes / (1000 * 1000)).toFixed(2))
}

const downloadFile = async (url, path) => {
  const res = await fetch(url)
  const dataLength = res.headers.get("content-length")
  const bar = new cliProgress.Bar({
    barCompleteChar: "#",
    barIncompleteChar: ".",
    format: "Downloading: [{bar}] {percentage}% | {value}/{total}MB",
  })
  bar.start(toMegabytes(dataLength), 0)

  const str = progressStream({
    length: dataLength,
    time: 100,
  }).on("progress", (progress) => bar.update(toMegabytes(progress.transferred)))

  const fileStream = fs.createWriteStream(path)

  return new Promise((resolve, reject) => {
    res.body.pipe(str).pipe(fileStream)
    res.body.on("error", (err) => {
      reject(err)
    })
    fileStream.on("finish", () => {
      bar.stop()
      resolve()
    })
  })
}

module.exports = downloadFile
