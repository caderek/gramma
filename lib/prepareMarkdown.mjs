import * as builder from "annotatedtext-remark"

const prepareMarkdown = (text) => JSON.stringify(builder.build(text))

export default prepareMarkdown
