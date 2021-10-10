var __create = Object.create
var __defProp = Object.defineProperty
var __getOwnPropDesc = Object.getOwnPropertyDescriptor
var __getOwnPropNames = Object.getOwnPropertyNames
var __getProtoOf = Object.getPrototypeOf
var __hasOwnProp = Object.prototype.hasOwnProperty
var __markAsModule = (target) =>
  __defProp(target, "__esModule", { value: true })
var __export = (target, all) => {
  __markAsModule(target)
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true })
}
var __reExport = (target, module2, desc) => {
  if (
    (module2 && typeof module2 === "object") ||
    typeof module2 === "function"
  ) {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, {
          get: () => module2[key],
          enumerable:
            !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable,
        })
  }
  return target
}
var __toModule = (module2) => {
  return __reExport(
    __markAsModule(
      __defProp(
        module2 != null ? __create(__getProtoOf(module2)) : {},
        "default",
        module2 && module2.__esModule && "default" in module2
          ? { get: () => module2.default, enumerable: true }
          : { value: module2, enumerable: true },
      ),
    ),
    module2,
  )
}

// lib/findUpSync.mjs
__export(exports, {
  default: () => findUpSync_default,
})

// lib/node_modules/find-up/index.js
var import_path = __toModule(require("path"))

// lib/node_modules/locate-path/index.js
var import_node_process = __toModule(require("process"))
var import_node_path = __toModule(require("path"))
var import_node_fs = __toModule(require("fs"))

// lib/node_modules/yocto-queue/index.js
var Node = class {
  value
  next
  constructor(value) {
    this.value = value
  }
}
var Queue = class {
  #head
  #tail
  #size
  constructor() {
    this.clear()
  }
  enqueue(value) {
    const node = new Node(value)
    if (this.#head) {
      this.#tail.next = node
      this.#tail = node
    } else {
      this.#head = node
      this.#tail = node
    }
    this.#size++
  }
  dequeue() {
    const current = this.#head
    if (!current) {
      return
    }
    this.#head = this.#head.next
    this.#size--
    return current.value
  }
  clear() {
    this.#head = void 0
    this.#tail = void 0
    this.#size = 0
  }
  get size() {
    return this.#size
  }
  *[Symbol.iterator]() {
    let current = this.#head
    while (current) {
      yield current.value
      current = current.next
    }
  }
}

// lib/node_modules/locate-path/index.js
var typeMappings = {
  directory: "isDirectory",
  file: "isFile",
}
function checkType(type) {
  if (type in typeMappings) {
    return
  }
  throw new Error(`Invalid type specified: ${type}`)
}
var matchType = (type, stat) => type === void 0 || stat[typeMappings[type]]()
function locatePathSync(
  paths,
  {
    cwd = import_node_process.default.cwd(),
    type = "file",
    allowSymlinks = true,
  } = {},
) {
  checkType(type)
  const statFunction = allowSymlinks
    ? import_node_fs.default.statSync
    : import_node_fs.default.lstatSync
  for (const path_ of paths) {
    try {
      const stat = statFunction(import_node_path.default.resolve(cwd, path_))
      if (matchType(type, stat)) {
        return path_
      }
    } catch {}
  }
}

// lib/node_modules/path-exists/index.js
var import_node_fs2 = __toModule(require("fs"))

// lib/node_modules/find-up/index.js
var findUpStop = Symbol("findUpStop")
function findUpMultipleSync(name, options = {}) {
  let directory = import_path.default.resolve(options.cwd || "")
  const { root } = import_path.default.parse(directory)
  const stopAt = options.stopAt || root
  const limit = options.limit || Number.POSITIVE_INFINITY
  const paths = [name].flat()
  const runMatcher = (locateOptions) => {
    if (typeof name !== "function") {
      return locatePathSync(paths, locateOptions)
    }
    const foundPath = name(locateOptions.cwd)
    if (typeof foundPath === "string") {
      return locatePathSync([foundPath], locateOptions)
    }
    return foundPath
  }
  const matches = []
  while (true) {
    const foundPath = runMatcher({ ...options, cwd: directory })
    if (foundPath === findUpStop) {
      break
    }
    if (foundPath) {
      matches.push(import_path.default.resolve(directory, foundPath))
    }
    if (directory === stopAt || matches.length >= limit) {
      break
    }
    directory = import_path.default.dirname(directory)
  }
  return matches
}
function findUpSync(name, options = {}) {
  const matches = findUpMultipleSync(name, { ...options, limit: 1 })
  return matches[0]
}

// lib/findUpSync.mjs
var findUpSync_default = findUpSync
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {})
