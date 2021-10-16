// @ts-nocheck
/**
 * Generated via:
 * esbuild lib/prepareMarkdown.mjs --bundle --outfile=src/utils/prepareMarkdown.js --format=cjs
 *
 * Do not edit directly!
 */

var __create = Object.create
var __defProp = Object.defineProperty
var __getOwnPropDesc = Object.getOwnPropertyDescriptor
var __getOwnPropNames = Object.getOwnPropertyNames
var __getProtoOf = Object.getPrototypeOf
var __hasOwnProp = Object.prototype.hasOwnProperty
var __markAsModule = (target) =>
  __defProp(target, "__esModule", { value: true })
var __commonJS = (cb, mod) =>
  function __require() {
    return (
      mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod),
      mod.exports
    )
  }
var __export = (target, all2) => {
  __markAsModule(target)
  for (var name in all2)
    __defProp(target, name, { get: all2[name], enumerable: true })
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

// node_modules/format/format.js
var require_format = __commonJS({
  "node_modules/format/format.js"(exports, module2) {
    ;(function () {
      var namespace
      if (typeof module2 !== "undefined") {
        namespace = module2.exports = format
      } else {
        namespace = (function () {
          return this || (1, eval)("this")
        })()
      }
      namespace.format = format
      namespace.vsprintf = vsprintf
      if (typeof console !== "undefined" && typeof console.log === "function") {
        namespace.printf = printf
      }
      function printf() {
        console.log(format.apply(null, arguments))
      }
      function vsprintf(fmt, replacements) {
        return format.apply(null, [fmt].concat(replacements))
      }
      function format(fmt) {
        var argIndex = 1,
          args = [].slice.call(arguments),
          i = 0,
          n = fmt.length,
          result = "",
          c,
          escaped = false,
          arg,
          tmp,
          leadingZero = false,
          precision,
          nextArg = function () {
            return args[argIndex++]
          },
          slurpNumber = function () {
            var digits = ""
            while (/\d/.test(fmt[i])) {
              digits += fmt[i++]
              c = fmt[i]
            }
            return digits.length > 0 ? parseInt(digits) : null
          }
        for (; i < n; ++i) {
          c = fmt[i]
          if (escaped) {
            escaped = false
            if (c == ".") {
              leadingZero = false
              c = fmt[++i]
            } else if (c == "0" && fmt[i + 1] == ".") {
              leadingZero = true
              i += 2
              c = fmt[i]
            } else {
              leadingZero = true
            }
            precision = slurpNumber()
            switch (c) {
              case "b":
                result += parseInt(nextArg(), 10).toString(2)
                break
              case "c":
                arg = nextArg()
                if (typeof arg === "string" || arg instanceof String)
                  result += arg
                else result += String.fromCharCode(parseInt(arg, 10))
                break
              case "d":
                result += parseInt(nextArg(), 10)
                break
              case "f":
                tmp = String(parseFloat(nextArg()).toFixed(precision || 6))
                result += leadingZero ? tmp : tmp.replace(/^0/, "")
                break
              case "j":
                result += JSON.stringify(nextArg())
                break
              case "o":
                result += "0" + parseInt(nextArg(), 10).toString(8)
                break
              case "s":
                result += nextArg()
                break
              case "x":
                result += "0x" + parseInt(nextArg(), 10).toString(16)
                break
              case "X":
                result +=
                  "0x" + parseInt(nextArg(), 10).toString(16).toUpperCase()
                break
              default:
                result += c
                break
            }
          } else if (c === "%") {
            escaped = true
          } else {
            result += c
          }
        }
        return result
      }
    })()
  },
})

// node_modules/is-buffer/index.js
var require_is_buffer = __commonJS({
  "node_modules/is-buffer/index.js"(exports, module2) {
    module2.exports = function isBuffer2(obj) {
      return (
        obj != null &&
        obj.constructor != null &&
        typeof obj.constructor.isBuffer === "function" &&
        obj.constructor.isBuffer(obj)
      )
    }
  },
})

// node_modules/extend/index.js
var require_extend = __commonJS({
  "node_modules/extend/index.js"(exports, module2) {
    "use strict"
    var hasOwn = Object.prototype.hasOwnProperty
    var toStr = Object.prototype.toString
    var defineProperty = Object.defineProperty
    var gOPD = Object.getOwnPropertyDescriptor
    var isArray = function isArray2(arr) {
      if (typeof Array.isArray === "function") {
        return Array.isArray(arr)
      }
      return toStr.call(arr) === "[object Array]"
    }
    var isPlainObject2 = function isPlainObject3(obj) {
      if (!obj || toStr.call(obj) !== "[object Object]") {
        return false
      }
      var hasOwnConstructor = hasOwn.call(obj, "constructor")
      var hasIsPrototypeOf =
        obj.constructor &&
        obj.constructor.prototype &&
        hasOwn.call(obj.constructor.prototype, "isPrototypeOf")
      if (obj.constructor && !hasOwnConstructor && !hasIsPrototypeOf) {
        return false
      }
      var key
      for (key in obj) {
      }
      return typeof key === "undefined" || hasOwn.call(obj, key)
    }
    var setProperty = function setProperty2(target, options) {
      if (defineProperty && options.name === "__proto__") {
        defineProperty(target, options.name, {
          enumerable: true,
          configurable: true,
          value: options.newValue,
          writable: true,
        })
      } else {
        target[options.name] = options.newValue
      }
    }
    var getProperty = function getProperty2(obj, name) {
      if (name === "__proto__") {
        if (!hasOwn.call(obj, name)) {
          return void 0
        } else if (gOPD) {
          return gOPD(obj, name).value
        }
      }
      return obj[name]
    }
    module2.exports = function extend2() {
      var options, name, src, copy, copyIsArray, clone
      var target = arguments[0]
      var i = 1
      var length = arguments.length
      var deep = false
      if (typeof target === "boolean") {
        deep = target
        target = arguments[1] || {}
        i = 2
      }
      if (
        target == null ||
        (typeof target !== "object" && typeof target !== "function")
      ) {
        target = {}
      }
      for (; i < length; ++i) {
        options = arguments[i]
        if (options != null) {
          for (name in options) {
            src = getProperty(target, name)
            copy = getProperty(options, name)
            if (target !== copy) {
              if (
                deep &&
                copy &&
                (isPlainObject2(copy) || (copyIsArray = isArray(copy)))
              ) {
                if (copyIsArray) {
                  copyIsArray = false
                  clone = src && isArray(src) ? src : []
                } else {
                  clone = src && isPlainObject2(src) ? src : {}
                }
                setProperty(target, {
                  name,
                  newValue: extend2(deep, clone, copy),
                })
              } else if (typeof copy !== "undefined") {
                setProperty(target, { name, newValue: copy })
              }
            }
          }
        }
      }
      return target
    }
  },
})

// lib/prepareMarkdown.mjs
__export(exports, {
  default: () => prepareMarkdown_default,
})

// node_modules/annotatedtext/out/index.js
var defaults = {
  children(node) {
    return node.children
  },
  annotatetextnode(node, text3) {
    if (node.type === "text") {
      return {
        offset: {
          end: node.position.end.offset,
          start: node.position.start.offset,
        },
        text: text3.substring(
          node.position.start.offset,
          node.position.end.offset,
        ),
      }
    } else {
      return null
    }
  },
  interpretmarkup(text3 = "") {
    return text3
  },
}
function collecttextnodes(ast, text3, options = defaults) {
  const textannotations = []
  function recurse(node) {
    const annotation = options.annotatetextnode(node, text3)
    if (annotation !== null) {
      textannotations.push(annotation)
    }
    const children = options.children(node)
    if (children !== null && Array.isArray(children)) {
      children.forEach(recurse)
    }
  }
  recurse(ast)
  return textannotations
}
function composeannotation(text3, annotatedtextnodes, options = defaults) {
  const annotations = []
  let prior = {
    offset: {
      end: 0,
      start: 0,
    },
  }
  for (const current of annotatedtextnodes) {
    const currenttext = text3.substring(prior.offset.end, current.offset.start)
    annotations.push({
      interpretAs: options.interpretmarkup(currenttext),
      markup: currenttext,
      offset: {
        end: current.offset.start,
        start: prior.offset.end,
      },
    })
    annotations.push(current)
    prior = current
  }
  const finaltext = text3.substring(prior.offset.end, text3.length)
  annotations.push({
    interpretAs: options.interpretmarkup(finaltext),
    markup: finaltext,
    offset: {
      end: text3.length,
      start: prior.offset.end,
    },
  })
  return { annotation: annotations }
}
function build(text3, parse3, options = defaults) {
  const nodes = parse3(text3)
  const textnodes = collecttextnodes(nodes, text3, options)
  return composeannotation(text3, textnodes, options)
}

// node_modules/fault/index.js
var import_format = __toModule(require_format())
var fault = Object.assign(create(Error), {
  eval: create(EvalError),
  range: create(RangeError),
  reference: create(ReferenceError),
  syntax: create(SyntaxError),
  type: create(TypeError),
  uri: create(URIError),
})
function create(Constructor) {
  FormattedError.displayName = Constructor.displayName || Constructor.name
  return FormattedError
  function FormattedError(format, ...values) {
    var reason = format ? (0, import_format.default)(format, ...values) : format
    return new Constructor(reason)
  }
}

// node_modules/micromark-extension-frontmatter/matters.js
var own = {}.hasOwnProperty
var markers = {
  yaml: "-",
  toml: "+",
}
function matters(options = "yaml") {
  const results = []
  let index2 = -1
  if (!Array.isArray(options)) {
    options = [options]
  }
  while (++index2 < options.length) {
    results[index2] = matter(options[index2])
  }
  return results
}
function matter(option) {
  let result = option
  if (typeof result === "string") {
    if (!own.call(markers, result)) {
      throw fault("Missing matter definition for `%s`", result)
    }
    result = {
      type: result,
      marker: markers[result],
    }
  } else if (typeof result !== "object") {
    throw fault("Expected matter to be an object, not `%j`", result)
  }
  if (!own.call(result, "type")) {
    throw fault("Missing `type` in matter `%j`", result)
  }
  if (!own.call(result, "fence") && !own.call(result, "marker")) {
    throw fault("Missing `marker` or `fence` in matter `%j`", result)
  }
  return result
}

// node_modules/micromark-util-character/lib/unicode-punctuation-regex.js
var unicodePunctuationRegex =
  /[!-/:-@[-`{-~\u00A1\u00A7\u00AB\u00B6\u00B7\u00BB\u00BF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C77\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4F\u2E52\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]/

// node_modules/micromark-util-character/index.js
var asciiAlpha = regexCheck(/[A-Za-z]/)
var asciiDigit = regexCheck(/\d/)
var asciiHexDigit = regexCheck(/[\dA-Fa-f]/)
var asciiAlphanumeric = regexCheck(/[\dA-Za-z]/)
var asciiPunctuation = regexCheck(/[!-/:-@[-`{-~]/)
var asciiAtext = regexCheck(/[#-'*+\--9=?A-Z^-~]/)
function asciiControl(code) {
  return code !== null && (code < 32 || code === 127)
}
function markdownLineEndingOrSpace(code) {
  return code !== null && (code < 0 || code === 32)
}
function markdownLineEnding(code) {
  return code !== null && code < -2
}
function markdownSpace(code) {
  return code === -2 || code === -1 || code === 32
}
var unicodeWhitespace = regexCheck(/\s/)
var unicodePunctuation = regexCheck(unicodePunctuationRegex)
function regexCheck(regex) {
  return check
  function check(code) {
    return code !== null && regex.test(String.fromCharCode(code))
  }
}

// node_modules/micromark-extension-frontmatter/lib/syntax.js
function frontmatter(options) {
  const settings = matters(options)
  const flow3 = {}
  let index2 = -1
  let matter2
  let code
  while (++index2 < settings.length) {
    matter2 = settings[index2]
    code = fence(matter2, "open").charCodeAt(0)
    if (code in flow3) {
      flow3[code].push(parse(matter2))
    } else {
      flow3[code] = [parse(matter2)]
    }
  }
  return {
    flow: flow3,
  }
}
function parse(matter2) {
  const name = matter2.type
  const anywhere = matter2.anywhere
  const valueType = name + "Value"
  const fenceType = name + "Fence"
  const sequenceType = fenceType + "Sequence"
  const fenceConstruct = {
    tokenize: tokenizeFence,
    partial: true,
  }
  let buffer2
  return {
    tokenize: tokenizeFrontmatter,
    concrete: true,
  }
  function tokenizeFrontmatter(effects, ok, nok) {
    const self = this
    return start
    function start(code) {
      const position2 = self.now()
      if (position2.column !== 1 || (!anywhere && position2.line !== 1)) {
        return nok(code)
      }
      effects.enter(name)
      buffer2 = fence(matter2, "open")
      return effects.attempt(fenceConstruct, afterOpeningFence, nok)(code)
    }
    function afterOpeningFence(code) {
      buffer2 = fence(matter2, "close")
      return lineEnd(code)
    }
    function lineStart(code) {
      if (code === null || markdownLineEnding(code)) {
        return lineEnd(code)
      }
      effects.enter(valueType)
      return lineData(code)
    }
    function lineData(code) {
      if (code === null || markdownLineEnding(code)) {
        effects.exit(valueType)
        return lineEnd(code)
      }
      effects.consume(code)
      return lineData
    }
    function lineEnd(code) {
      if (code === null) {
        return nok(code)
      }
      effects.enter("lineEnding")
      effects.consume(code)
      effects.exit("lineEnding")
      return effects.attempt(fenceConstruct, after, lineStart)
    }
    function after(code) {
      effects.exit(name)
      return ok(code)
    }
  }
  function tokenizeFence(effects, ok, nok) {
    let bufferIndex = 0
    return start
    function start(code) {
      if (code === buffer2.charCodeAt(bufferIndex)) {
        effects.enter(fenceType)
        effects.enter(sequenceType)
        return insideSequence(code)
      }
      return nok(code)
    }
    function insideSequence(code) {
      if (bufferIndex === buffer2.length) {
        effects.exit(sequenceType)
        if (markdownSpace(code)) {
          effects.enter("whitespace")
          return insideWhitespace(code)
        }
        return fenceEnd(code)
      }
      if (code === buffer2.charCodeAt(bufferIndex++)) {
        effects.consume(code)
        return insideSequence
      }
      return nok(code)
    }
    function insideWhitespace(code) {
      if (markdownSpace(code)) {
        effects.consume(code)
        return insideWhitespace
      }
      effects.exit("whitespace")
      return fenceEnd(code)
    }
    function fenceEnd(code) {
      if (code === null || markdownLineEnding(code)) {
        effects.exit(fenceType)
        return ok(code)
      }
      return nok(code)
    }
  }
}
function fence(matter2, prop) {
  return matter2.marker
    ? pick(matter2.marker, prop).repeat(3)
    : pick(matter2.fence, prop)
}
function pick(schema, prop) {
  return typeof schema === "string" ? schema : schema[prop]
}

// node_modules/mdast-util-frontmatter/index.js
function frontmatterFromMarkdown(options) {
  const settings = matters(options)
  const enter = {}
  const exit2 = {}
  let index2 = -1
  while (++index2 < settings.length) {
    const matter2 = settings[index2]
    enter[matter2.type] = opener(matter2)
    exit2[matter2.type] = close
    exit2[matter2.type + "Value"] = value
  }
  return { enter, exit: exit2 }
}
function opener(matter2) {
  return open
  function open(token) {
    this.enter({ type: matter2.type, value: "" }, token)
    this.buffer()
  }
}
function close(token) {
  const data = this.resume()
  this.exit(token).value = data.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, "")
}
function value(token) {
  this.config.enter.data.call(this, token)
  this.config.exit.data.call(this, token)
}
function frontmatterToMarkdown(options) {
  const unsafe = []
  const handlers = {}
  const settings = matters(options)
  let index2 = -1
  while (++index2 < settings.length) {
    const matter2 = settings[index2]
    handlers[matter2.type] = handler(matter2)
    unsafe.push({ atBreak: true, character: fence2(matter2, "open").charAt(0) })
  }
  return { unsafe, handlers }
}
function handler(matter2) {
  const open = fence2(matter2, "open")
  const close2 = fence2(matter2, "close")
  return handle
  function handle(node) {
    return open + (node.value ? "\n" + node.value : "") + "\n" + close2
  }
}
function fence2(matter2, prop) {
  return matter2.marker
    ? pick2(matter2.marker, prop).repeat(3)
    : pick2(matter2.fence, prop)
}
function pick2(schema, prop) {
  return typeof schema === "string" ? schema : schema[prop]
}

// node_modules/remark-frontmatter/index.js
function remarkFrontmatter(options = "yaml") {
  const data = this.data()
  add("micromarkExtensions", frontmatter(options))
  add("fromMarkdownExtensions", frontmatterFromMarkdown(options))
  add("toMarkdownExtensions", frontmatterToMarkdown(options))
  function add(field, value2) {
    const list2 = data[field] ? data[field] : (data[field] = [])
    list2.push(value2)
  }
}

// node_modules/mdast-util-to-string/index.js
function toString(node, options) {
  var { includeImageAlt = true } = options || {}
  return one(node, includeImageAlt)
}
function one(node, includeImageAlt) {
  return (
    (node &&
      typeof node === "object" &&
      (node.value ||
        (includeImageAlt ? node.alt : "") ||
        ("children" in node && all(node.children, includeImageAlt)) ||
        (Array.isArray(node) && all(node, includeImageAlt)))) ||
    ""
  )
}
function all(values, includeImageAlt) {
  var result = []
  var index2 = -1
  while (++index2 < values.length) {
    result[index2] = one(values[index2], includeImageAlt)
  }
  return result.join("")
}

// node_modules/micromark-util-chunked/index.js
function splice(list2, start, remove, items) {
  const end = list2.length
  let chunkStart = 0
  let parameters
  if (start < 0) {
    start = -start > end ? 0 : end + start
  } else {
    start = start > end ? end : start
  }
  remove = remove > 0 ? remove : 0
  if (items.length < 1e4) {
    parameters = Array.from(items)
    parameters.unshift(start, remove)
    ;[].splice.apply(list2, parameters)
  } else {
    if (remove) [].splice.apply(list2, [start, remove])
    while (chunkStart < items.length) {
      parameters = items.slice(chunkStart, chunkStart + 1e4)
      parameters.unshift(start, 0)
      ;[].splice.apply(list2, parameters)
      chunkStart += 1e4
      start += 1e4
    }
  }
}
function push(list2, items) {
  if (list2.length > 0) {
    splice(list2, list2.length, 0, items)
    return list2
  }
  return items
}

// node_modules/micromark-util-combine-extensions/index.js
var hasOwnProperty = {}.hasOwnProperty
function combineExtensions(extensions) {
  const all2 = {}
  let index2 = -1
  while (++index2 < extensions.length) {
    syntaxExtension(all2, extensions[index2])
  }
  return all2
}
function syntaxExtension(all2, extension2) {
  let hook
  for (hook in extension2) {
    const maybe = hasOwnProperty.call(all2, hook) ? all2[hook] : void 0
    const left = maybe || (all2[hook] = {})
    const right = extension2[hook]
    let code
    for (code in right) {
      if (!hasOwnProperty.call(left, code)) left[code] = []
      const value2 = right[code]
      constructs(
        left[code],
        Array.isArray(value2) ? value2 : value2 ? [value2] : [],
      )
    }
  }
}
function constructs(existing, list2) {
  let index2 = -1
  const before = []
  while (++index2 < list2.length) {
    ;(list2[index2].add === "after" ? existing : before).push(list2[index2])
  }
  splice(existing, 0, 0, before)
}

// node_modules/micromark-factory-space/index.js
function factorySpace(effects, ok, type, max) {
  const limit = max ? max - 1 : Number.POSITIVE_INFINITY
  let size = 0
  return start
  function start(code) {
    if (markdownSpace(code)) {
      effects.enter(type)
      return prefix(code)
    }
    return ok(code)
  }
  function prefix(code) {
    if (markdownSpace(code) && size++ < limit) {
      effects.consume(code)
      return prefix
    }
    effects.exit(type)
    return ok(code)
  }
}

// node_modules/micromark/lib/initialize/content.js
var content = {
  tokenize: initializeContent,
}
function initializeContent(effects) {
  const contentStart = effects.attempt(
    this.parser.constructs.contentInitial,
    afterContentStartConstruct,
    paragraphInitial,
  )
  let previous2
  return contentStart
  function afterContentStartConstruct(code) {
    if (code === null) {
      effects.consume(code)
      return
    }
    effects.enter("lineEnding")
    effects.consume(code)
    effects.exit("lineEnding")
    return factorySpace(effects, contentStart, "linePrefix")
  }
  function paragraphInitial(code) {
    effects.enter("paragraph")
    return lineStart(code)
  }
  function lineStart(code) {
    const token = effects.enter("chunkText", {
      contentType: "text",
      previous: previous2,
    })
    if (previous2) {
      previous2.next = token
    }
    previous2 = token
    return data(code)
  }
  function data(code) {
    if (code === null) {
      effects.exit("chunkText")
      effects.exit("paragraph")
      effects.consume(code)
      return
    }
    if (markdownLineEnding(code)) {
      effects.consume(code)
      effects.exit("chunkText")
      return lineStart
    }
    effects.consume(code)
    return data
  }
}

// node_modules/micromark/lib/initialize/document.js
var document2 = {
  tokenize: initializeDocument,
}
var containerConstruct = {
  tokenize: tokenizeContainer,
}
function initializeDocument(effects) {
  const self = this
  const stack = []
  let continued = 0
  let childFlow
  let childToken
  let lineStartOffset
  return start
  function start(code) {
    if (continued < stack.length) {
      const item = stack[continued]
      self.containerState = item[1]
      return effects.attempt(
        item[0].continuation,
        documentContinue,
        checkNewContainers,
      )(code)
    }
    return checkNewContainers(code)
  }
  function documentContinue(code) {
    continued++
    if (self.containerState._closeFlow) {
      self.containerState._closeFlow = void 0
      if (childFlow) {
        closeFlow()
      }
      const indexBeforeExits = self.events.length
      let indexBeforeFlow = indexBeforeExits
      let point2
      while (indexBeforeFlow--) {
        if (
          self.events[indexBeforeFlow][0] === "exit" &&
          self.events[indexBeforeFlow][1].type === "chunkFlow"
        ) {
          point2 = self.events[indexBeforeFlow][1].end
          break
        }
      }
      exitContainers(continued)
      let index2 = indexBeforeExits
      while (index2 < self.events.length) {
        self.events[index2][1].end = Object.assign({}, point2)
        index2++
      }
      splice(
        self.events,
        indexBeforeFlow + 1,
        0,
        self.events.slice(indexBeforeExits),
      )
      self.events.length = index2
      return checkNewContainers(code)
    }
    return start(code)
  }
  function checkNewContainers(code) {
    if (continued === stack.length) {
      if (!childFlow) {
        return documentContinued(code)
      }
      if (childFlow.currentConstruct && childFlow.currentConstruct.concrete) {
        return flowStart(code)
      }
      self.interrupt = Boolean(childFlow.currentConstruct)
    }
    self.containerState = {}
    return effects.check(
      containerConstruct,
      thereIsANewContainer,
      thereIsNoNewContainer,
    )(code)
  }
  function thereIsANewContainer(code) {
    if (childFlow) closeFlow()
    exitContainers(continued)
    return documentContinued(code)
  }
  function thereIsNoNewContainer(code) {
    self.parser.lazy[self.now().line] = continued !== stack.length
    lineStartOffset = self.now().offset
    return flowStart(code)
  }
  function documentContinued(code) {
    self.containerState = {}
    return effects.attempt(
      containerConstruct,
      containerContinue,
      flowStart,
    )(code)
  }
  function containerContinue(code) {
    continued++
    stack.push([self.currentConstruct, self.containerState])
    return documentContinued(code)
  }
  function flowStart(code) {
    if (code === null) {
      if (childFlow) closeFlow()
      exitContainers(0)
      effects.consume(code)
      return
    }
    childFlow = childFlow || self.parser.flow(self.now())
    effects.enter("chunkFlow", {
      contentType: "flow",
      previous: childToken,
      _tokenizer: childFlow,
    })
    return flowContinue(code)
  }
  function flowContinue(code) {
    if (code === null) {
      writeToChild(effects.exit("chunkFlow"), true)
      exitContainers(0)
      effects.consume(code)
      return
    }
    if (markdownLineEnding(code)) {
      effects.consume(code)
      writeToChild(effects.exit("chunkFlow"))
      continued = 0
      self.interrupt = void 0
      return start
    }
    effects.consume(code)
    return flowContinue
  }
  function writeToChild(token, eof) {
    const stream = self.sliceStream(token)
    if (eof) stream.push(null)
    token.previous = childToken
    if (childToken) childToken.next = token
    childToken = token
    childFlow.defineSkip(token.start)
    childFlow.write(stream)
    if (self.parser.lazy[token.start.line]) {
      let index2 = childFlow.events.length
      while (index2--) {
        if (
          childFlow.events[index2][1].start.offset < lineStartOffset &&
          (!childFlow.events[index2][1].end ||
            childFlow.events[index2][1].end.offset > lineStartOffset)
        ) {
          return
        }
      }
      const indexBeforeExits = self.events.length
      let indexBeforeFlow = indexBeforeExits
      let seen
      let point2
      while (indexBeforeFlow--) {
        if (
          self.events[indexBeforeFlow][0] === "exit" &&
          self.events[indexBeforeFlow][1].type === "chunkFlow"
        ) {
          if (seen) {
            point2 = self.events[indexBeforeFlow][1].end
            break
          }
          seen = true
        }
      }
      exitContainers(continued)
      index2 = indexBeforeExits
      while (index2 < self.events.length) {
        self.events[index2][1].end = Object.assign({}, point2)
        index2++
      }
      splice(
        self.events,
        indexBeforeFlow + 1,
        0,
        self.events.slice(indexBeforeExits),
      )
      self.events.length = index2
    }
  }
  function exitContainers(size) {
    let index2 = stack.length
    while (index2-- > size) {
      const entry = stack[index2]
      self.containerState = entry[1]
      entry[0].exit.call(self, effects)
    }
    stack.length = size
  }
  function closeFlow() {
    childFlow.write([null])
    childToken = void 0
    childFlow = void 0
    self.containerState._closeFlow = void 0
  }
}
function tokenizeContainer(effects, ok, nok) {
  return factorySpace(
    effects,
    effects.attempt(this.parser.constructs.document, ok, nok),
    "linePrefix",
    this.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4,
  )
}

// node_modules/micromark-util-classify-character/index.js
function classifyCharacter(code) {
  if (
    code === null ||
    markdownLineEndingOrSpace(code) ||
    unicodeWhitespace(code)
  ) {
    return 1
  }
  if (unicodePunctuation(code)) {
    return 2
  }
}

// node_modules/micromark-util-resolve-all/index.js
function resolveAll(constructs2, events, context) {
  const called = []
  let index2 = -1
  while (++index2 < constructs2.length) {
    const resolve = constructs2[index2].resolveAll
    if (resolve && !called.includes(resolve)) {
      events = resolve(events, context)
      called.push(resolve)
    }
  }
  return events
}

// node_modules/micromark-core-commonmark/lib/attention.js
var attention = {
  name: "attention",
  tokenize: tokenizeAttention,
  resolveAll: resolveAllAttention,
}
function resolveAllAttention(events, context) {
  let index2 = -1
  let open
  let group
  let text3
  let openingSequence
  let closingSequence
  let use
  let nextEvents
  let offset
  while (++index2 < events.length) {
    if (
      events[index2][0] === "enter" &&
      events[index2][1].type === "attentionSequence" &&
      events[index2][1]._close
    ) {
      open = index2
      while (open--) {
        if (
          events[open][0] === "exit" &&
          events[open][1].type === "attentionSequence" &&
          events[open][1]._open &&
          context.sliceSerialize(events[open][1]).charCodeAt(0) ===
            context.sliceSerialize(events[index2][1]).charCodeAt(0)
        ) {
          if (
            (events[open][1]._close || events[index2][1]._open) &&
            (events[index2][1].end.offset - events[index2][1].start.offset) %
              3 &&
            !(
              (events[open][1].end.offset -
                events[open][1].start.offset +
                events[index2][1].end.offset -
                events[index2][1].start.offset) %
              3
            )
          ) {
            continue
          }
          use =
            events[open][1].end.offset - events[open][1].start.offset > 1 &&
            events[index2][1].end.offset - events[index2][1].start.offset > 1
              ? 2
              : 1
          const start = Object.assign({}, events[open][1].end)
          const end = Object.assign({}, events[index2][1].start)
          movePoint(start, -use)
          movePoint(end, use)
          openingSequence = {
            type: use > 1 ? "strongSequence" : "emphasisSequence",
            start,
            end: Object.assign({}, events[open][1].end),
          }
          closingSequence = {
            type: use > 1 ? "strongSequence" : "emphasisSequence",
            start: Object.assign({}, events[index2][1].start),
            end,
          }
          text3 = {
            type: use > 1 ? "strongText" : "emphasisText",
            start: Object.assign({}, events[open][1].end),
            end: Object.assign({}, events[index2][1].start),
          }
          group = {
            type: use > 1 ? "strong" : "emphasis",
            start: Object.assign({}, openingSequence.start),
            end: Object.assign({}, closingSequence.end),
          }
          events[open][1].end = Object.assign({}, openingSequence.start)
          events[index2][1].start = Object.assign({}, closingSequence.end)
          nextEvents = []
          if (events[open][1].end.offset - events[open][1].start.offset) {
            nextEvents = push(nextEvents, [
              ["enter", events[open][1], context],
              ["exit", events[open][1], context],
            ])
          }
          nextEvents = push(nextEvents, [
            ["enter", group, context],
            ["enter", openingSequence, context],
            ["exit", openingSequence, context],
            ["enter", text3, context],
          ])
          nextEvents = push(
            nextEvents,
            resolveAll(
              context.parser.constructs.insideSpan.null,
              events.slice(open + 1, index2),
              context,
            ),
          )
          nextEvents = push(nextEvents, [
            ["exit", text3, context],
            ["enter", closingSequence, context],
            ["exit", closingSequence, context],
            ["exit", group, context],
          ])
          if (events[index2][1].end.offset - events[index2][1].start.offset) {
            offset = 2
            nextEvents = push(nextEvents, [
              ["enter", events[index2][1], context],
              ["exit", events[index2][1], context],
            ])
          } else {
            offset = 0
          }
          splice(events, open - 1, index2 - open + 3, nextEvents)
          index2 = open + nextEvents.length - offset - 2
          break
        }
      }
    }
  }
  index2 = -1
  while (++index2 < events.length) {
    if (events[index2][1].type === "attentionSequence") {
      events[index2][1].type = "data"
    }
  }
  return events
}
function tokenizeAttention(effects, ok) {
  const attentionMarkers2 = this.parser.constructs.attentionMarkers.null
  const previous2 = this.previous
  const before = classifyCharacter(previous2)
  let marker
  return start
  function start(code) {
    effects.enter("attentionSequence")
    marker = code
    return sequence(code)
  }
  function sequence(code) {
    if (code === marker) {
      effects.consume(code)
      return sequence
    }
    const token = effects.exit("attentionSequence")
    const after = classifyCharacter(code)
    const open =
      !after || (after === 2 && before) || attentionMarkers2.includes(code)
    const close2 =
      !before ||
      (before === 2 && after) ||
      attentionMarkers2.includes(previous2)
    token._open = Boolean(marker === 42 ? open : open && (before || !close2))
    token._close = Boolean(marker === 42 ? close2 : close2 && (after || !open))
    return ok(code)
  }
}
function movePoint(point2, offset) {
  point2.column += offset
  point2.offset += offset
  point2._bufferIndex += offset
}

// node_modules/micromark-core-commonmark/lib/autolink.js
var autolink = {
  name: "autolink",
  tokenize: tokenizeAutolink,
}
function tokenizeAutolink(effects, ok, nok) {
  let size = 1
  return start
  function start(code) {
    effects.enter("autolink")
    effects.enter("autolinkMarker")
    effects.consume(code)
    effects.exit("autolinkMarker")
    effects.enter("autolinkProtocol")
    return open
  }
  function open(code) {
    if (asciiAlpha(code)) {
      effects.consume(code)
      return schemeOrEmailAtext
    }
    return asciiAtext(code) ? emailAtext(code) : nok(code)
  }
  function schemeOrEmailAtext(code) {
    return code === 43 || code === 45 || code === 46 || asciiAlphanumeric(code)
      ? schemeInsideOrEmailAtext(code)
      : emailAtext(code)
  }
  function schemeInsideOrEmailAtext(code) {
    if (code === 58) {
      effects.consume(code)
      return urlInside
    }
    if (
      (code === 43 || code === 45 || code === 46 || asciiAlphanumeric(code)) &&
      size++ < 32
    ) {
      effects.consume(code)
      return schemeInsideOrEmailAtext
    }
    return emailAtext(code)
  }
  function urlInside(code) {
    if (code === 62) {
      effects.exit("autolinkProtocol")
      return end(code)
    }
    if (code === null || code === 32 || code === 60 || asciiControl(code)) {
      return nok(code)
    }
    effects.consume(code)
    return urlInside
  }
  function emailAtext(code) {
    if (code === 64) {
      effects.consume(code)
      size = 0
      return emailAtSignOrDot
    }
    if (asciiAtext(code)) {
      effects.consume(code)
      return emailAtext
    }
    return nok(code)
  }
  function emailAtSignOrDot(code) {
    return asciiAlphanumeric(code) ? emailLabel(code) : nok(code)
  }
  function emailLabel(code) {
    if (code === 46) {
      effects.consume(code)
      size = 0
      return emailAtSignOrDot
    }
    if (code === 62) {
      effects.exit("autolinkProtocol").type = "autolinkEmail"
      return end(code)
    }
    return emailValue(code)
  }
  function emailValue(code) {
    if ((code === 45 || asciiAlphanumeric(code)) && size++ < 63) {
      effects.consume(code)
      return code === 45 ? emailValue : emailLabel
    }
    return nok(code)
  }
  function end(code) {
    effects.enter("autolinkMarker")
    effects.consume(code)
    effects.exit("autolinkMarker")
    effects.exit("autolink")
    return ok
  }
}

// node_modules/micromark-core-commonmark/lib/blank-line.js
var blankLine = {
  tokenize: tokenizeBlankLine,
  partial: true,
}
function tokenizeBlankLine(effects, ok, nok) {
  return factorySpace(effects, afterWhitespace, "linePrefix")
  function afterWhitespace(code) {
    return code === null || markdownLineEnding(code) ? ok(code) : nok(code)
  }
}

// node_modules/micromark-core-commonmark/lib/block-quote.js
var blockQuote = {
  name: "blockQuote",
  tokenize: tokenizeBlockQuoteStart,
  continuation: {
    tokenize: tokenizeBlockQuoteContinuation,
  },
  exit,
}
function tokenizeBlockQuoteStart(effects, ok, nok) {
  const self = this
  return start
  function start(code) {
    if (code === 62) {
      const state = self.containerState
      if (!state.open) {
        effects.enter("blockQuote", {
          _container: true,
        })
        state.open = true
      }
      effects.enter("blockQuotePrefix")
      effects.enter("blockQuoteMarker")
      effects.consume(code)
      effects.exit("blockQuoteMarker")
      return after
    }
    return nok(code)
  }
  function after(code) {
    if (markdownSpace(code)) {
      effects.enter("blockQuotePrefixWhitespace")
      effects.consume(code)
      effects.exit("blockQuotePrefixWhitespace")
      effects.exit("blockQuotePrefix")
      return ok
    }
    effects.exit("blockQuotePrefix")
    return ok(code)
  }
}
function tokenizeBlockQuoteContinuation(effects, ok, nok) {
  return factorySpace(
    effects,
    effects.attempt(blockQuote, ok, nok),
    "linePrefix",
    this.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4,
  )
}
function exit(effects) {
  effects.exit("blockQuote")
}

// node_modules/micromark-core-commonmark/lib/character-escape.js
var characterEscape = {
  name: "characterEscape",
  tokenize: tokenizeCharacterEscape,
}
function tokenizeCharacterEscape(effects, ok, nok) {
  return start
  function start(code) {
    effects.enter("characterEscape")
    effects.enter("escapeMarker")
    effects.consume(code)
    effects.exit("escapeMarker")
    return open
  }
  function open(code) {
    if (asciiPunctuation(code)) {
      effects.enter("characterEscapeValue")
      effects.consume(code)
      effects.exit("characterEscapeValue")
      effects.exit("characterEscape")
      return ok
    }
    return nok(code)
  }
}

// node_modules/parse-entities/decode-entity.browser.js
var semicolon = 59
var element
function decodeEntity(characters) {
  var entity = "&" + characters + ";"
  var char
  element = element || document.createElement("i")
  element.innerHTML = entity
  char = element.textContent
  if (char.charCodeAt(char.length - 1) === semicolon && characters !== "semi") {
    return false
  }
  return char === entity ? false : char
}

// node_modules/micromark-core-commonmark/lib/character-reference.js
var characterReference = {
  name: "characterReference",
  tokenize: tokenizeCharacterReference,
}
function tokenizeCharacterReference(effects, ok, nok) {
  const self = this
  let size = 0
  let max
  let test
  return start
  function start(code) {
    effects.enter("characterReference")
    effects.enter("characterReferenceMarker")
    effects.consume(code)
    effects.exit("characterReferenceMarker")
    return open
  }
  function open(code) {
    if (code === 35) {
      effects.enter("characterReferenceMarkerNumeric")
      effects.consume(code)
      effects.exit("characterReferenceMarkerNumeric")
      return numeric
    }
    effects.enter("characterReferenceValue")
    max = 31
    test = asciiAlphanumeric
    return value2(code)
  }
  function numeric(code) {
    if (code === 88 || code === 120) {
      effects.enter("characterReferenceMarkerHexadecimal")
      effects.consume(code)
      effects.exit("characterReferenceMarkerHexadecimal")
      effects.enter("characterReferenceValue")
      max = 6
      test = asciiHexDigit
      return value2
    }
    effects.enter("characterReferenceValue")
    max = 7
    test = asciiDigit
    return value2(code)
  }
  function value2(code) {
    let token
    if (code === 59 && size) {
      token = effects.exit("characterReferenceValue")
      if (
        test === asciiAlphanumeric &&
        !decodeEntity(self.sliceSerialize(token))
      ) {
        return nok(code)
      }
      effects.enter("characterReferenceMarker")
      effects.consume(code)
      effects.exit("characterReferenceMarker")
      effects.exit("characterReference")
      return ok
    }
    if (test(code) && size++ < max) {
      effects.consume(code)
      return value2
    }
    return nok(code)
  }
}

// node_modules/micromark-core-commonmark/lib/code-fenced.js
var codeFenced = {
  name: "codeFenced",
  tokenize: tokenizeCodeFenced,
  concrete: true,
}
function tokenizeCodeFenced(effects, ok, nok) {
  const self = this
  const closingFenceConstruct = {
    tokenize: tokenizeClosingFence,
    partial: true,
  }
  const nonLazyLine = {
    tokenize: tokenizeNonLazyLine,
    partial: true,
  }
  const tail = this.events[this.events.length - 1]
  const initialPrefix =
    tail && tail[1].type === "linePrefix"
      ? tail[2].sliceSerialize(tail[1], true).length
      : 0
  let sizeOpen = 0
  let marker
  return start
  function start(code) {
    effects.enter("codeFenced")
    effects.enter("codeFencedFence")
    effects.enter("codeFencedFenceSequence")
    marker = code
    return sequenceOpen(code)
  }
  function sequenceOpen(code) {
    if (code === marker) {
      effects.consume(code)
      sizeOpen++
      return sequenceOpen
    }
    effects.exit("codeFencedFenceSequence")
    return sizeOpen < 3
      ? nok(code)
      : factorySpace(effects, infoOpen, "whitespace")(code)
  }
  function infoOpen(code) {
    if (code === null || markdownLineEnding(code)) {
      return openAfter(code)
    }
    effects.enter("codeFencedFenceInfo")
    effects.enter("chunkString", {
      contentType: "string",
    })
    return info(code)
  }
  function info(code) {
    if (code === null || markdownLineEndingOrSpace(code)) {
      effects.exit("chunkString")
      effects.exit("codeFencedFenceInfo")
      return factorySpace(effects, infoAfter, "whitespace")(code)
    }
    if (code === 96 && code === marker) return nok(code)
    effects.consume(code)
    return info
  }
  function infoAfter(code) {
    if (code === null || markdownLineEnding(code)) {
      return openAfter(code)
    }
    effects.enter("codeFencedFenceMeta")
    effects.enter("chunkString", {
      contentType: "string",
    })
    return meta(code)
  }
  function meta(code) {
    if (code === null || markdownLineEnding(code)) {
      effects.exit("chunkString")
      effects.exit("codeFencedFenceMeta")
      return openAfter(code)
    }
    if (code === 96 && code === marker) return nok(code)
    effects.consume(code)
    return meta
  }
  function openAfter(code) {
    effects.exit("codeFencedFence")
    return self.interrupt ? ok(code) : contentStart(code)
  }
  function contentStart(code) {
    if (code === null) {
      return after(code)
    }
    if (markdownLineEnding(code)) {
      return effects.attempt(
        nonLazyLine,
        effects.attempt(
          closingFenceConstruct,
          after,
          initialPrefix
            ? factorySpace(
                effects,
                contentStart,
                "linePrefix",
                initialPrefix + 1,
              )
            : contentStart,
        ),
        after,
      )(code)
    }
    effects.enter("codeFlowValue")
    return contentContinue(code)
  }
  function contentContinue(code) {
    if (code === null || markdownLineEnding(code)) {
      effects.exit("codeFlowValue")
      return contentStart(code)
    }
    effects.consume(code)
    return contentContinue
  }
  function after(code) {
    effects.exit("codeFenced")
    return ok(code)
  }
  function tokenizeNonLazyLine(effects2, ok2, nok2) {
    const self2 = this
    return start2
    function start2(code) {
      effects2.enter("lineEnding")
      effects2.consume(code)
      effects2.exit("lineEnding")
      return lineStart
    }
    function lineStart(code) {
      return self2.parser.lazy[self2.now().line] ? nok2(code) : ok2(code)
    }
  }
  function tokenizeClosingFence(effects2, ok2, nok2) {
    let size = 0
    return factorySpace(
      effects2,
      closingSequenceStart,
      "linePrefix",
      this.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4,
    )
    function closingSequenceStart(code) {
      effects2.enter("codeFencedFence")
      effects2.enter("codeFencedFenceSequence")
      return closingSequence(code)
    }
    function closingSequence(code) {
      if (code === marker) {
        effects2.consume(code)
        size++
        return closingSequence
      }
      if (size < sizeOpen) return nok2(code)
      effects2.exit("codeFencedFenceSequence")
      return factorySpace(effects2, closingSequenceEnd, "whitespace")(code)
    }
    function closingSequenceEnd(code) {
      if (code === null || markdownLineEnding(code)) {
        effects2.exit("codeFencedFence")
        return ok2(code)
      }
      return nok2(code)
    }
  }
}

// node_modules/micromark-core-commonmark/lib/code-indented.js
var codeIndented = {
  name: "codeIndented",
  tokenize: tokenizeCodeIndented,
}
var indentedContent = {
  tokenize: tokenizeIndentedContent,
  partial: true,
}
function tokenizeCodeIndented(effects, ok, nok) {
  const self = this
  return start
  function start(code) {
    effects.enter("codeIndented")
    return factorySpace(effects, afterStartPrefix, "linePrefix", 4 + 1)(code)
  }
  function afterStartPrefix(code) {
    const tail = self.events[self.events.length - 1]
    return tail &&
      tail[1].type === "linePrefix" &&
      tail[2].sliceSerialize(tail[1], true).length >= 4
      ? afterPrefix(code)
      : nok(code)
  }
  function afterPrefix(code) {
    if (code === null) {
      return after(code)
    }
    if (markdownLineEnding(code)) {
      return effects.attempt(indentedContent, afterPrefix, after)(code)
    }
    effects.enter("codeFlowValue")
    return content3(code)
  }
  function content3(code) {
    if (code === null || markdownLineEnding(code)) {
      effects.exit("codeFlowValue")
      return afterPrefix(code)
    }
    effects.consume(code)
    return content3
  }
  function after(code) {
    effects.exit("codeIndented")
    return ok(code)
  }
}
function tokenizeIndentedContent(effects, ok, nok) {
  const self = this
  return start
  function start(code) {
    if (self.parser.lazy[self.now().line]) {
      return nok(code)
    }
    if (markdownLineEnding(code)) {
      effects.enter("lineEnding")
      effects.consume(code)
      effects.exit("lineEnding")
      return start
    }
    return factorySpace(effects, afterPrefix, "linePrefix", 4 + 1)(code)
  }
  function afterPrefix(code) {
    const tail = self.events[self.events.length - 1]
    return tail &&
      tail[1].type === "linePrefix" &&
      tail[2].sliceSerialize(tail[1], true).length >= 4
      ? ok(code)
      : markdownLineEnding(code)
      ? start(code)
      : nok(code)
  }
}

// node_modules/micromark-core-commonmark/lib/code-text.js
var codeText = {
  name: "codeText",
  tokenize: tokenizeCodeText,
  resolve: resolveCodeText,
  previous,
}
function resolveCodeText(events) {
  let tailExitIndex = events.length - 4
  let headEnterIndex = 3
  let index2
  let enter
  if (
    (events[headEnterIndex][1].type === "lineEnding" ||
      events[headEnterIndex][1].type === "space") &&
    (events[tailExitIndex][1].type === "lineEnding" ||
      events[tailExitIndex][1].type === "space")
  ) {
    index2 = headEnterIndex
    while (++index2 < tailExitIndex) {
      if (events[index2][1].type === "codeTextData") {
        events[headEnterIndex][1].type = "codeTextPadding"
        events[tailExitIndex][1].type = "codeTextPadding"
        headEnterIndex += 2
        tailExitIndex -= 2
        break
      }
    }
  }
  index2 = headEnterIndex - 1
  tailExitIndex++
  while (++index2 <= tailExitIndex) {
    if (enter === void 0) {
      if (index2 !== tailExitIndex && events[index2][1].type !== "lineEnding") {
        enter = index2
      }
    } else if (
      index2 === tailExitIndex ||
      events[index2][1].type === "lineEnding"
    ) {
      events[enter][1].type = "codeTextData"
      if (index2 !== enter + 2) {
        events[enter][1].end = events[index2 - 1][1].end
        events.splice(enter + 2, index2 - enter - 2)
        tailExitIndex -= index2 - enter - 2
        index2 = enter + 2
      }
      enter = void 0
    }
  }
  return events
}
function previous(code) {
  return (
    code !== 96 ||
    this.events[this.events.length - 1][1].type === "characterEscape"
  )
}
function tokenizeCodeText(effects, ok, nok) {
  const self = this
  let sizeOpen = 0
  let size
  let token
  return start
  function start(code) {
    effects.enter("codeText")
    effects.enter("codeTextSequence")
    return openingSequence(code)
  }
  function openingSequence(code) {
    if (code === 96) {
      effects.consume(code)
      sizeOpen++
      return openingSequence
    }
    effects.exit("codeTextSequence")
    return gap(code)
  }
  function gap(code) {
    if (code === null) {
      return nok(code)
    }
    if (code === 96) {
      token = effects.enter("codeTextSequence")
      size = 0
      return closingSequence(code)
    }
    if (code === 32) {
      effects.enter("space")
      effects.consume(code)
      effects.exit("space")
      return gap
    }
    if (markdownLineEnding(code)) {
      effects.enter("lineEnding")
      effects.consume(code)
      effects.exit("lineEnding")
      return gap
    }
    effects.enter("codeTextData")
    return data(code)
  }
  function data(code) {
    if (
      code === null ||
      code === 32 ||
      code === 96 ||
      markdownLineEnding(code)
    ) {
      effects.exit("codeTextData")
      return gap(code)
    }
    effects.consume(code)
    return data
  }
  function closingSequence(code) {
    if (code === 96) {
      effects.consume(code)
      size++
      return closingSequence
    }
    if (size === sizeOpen) {
      effects.exit("codeTextSequence")
      effects.exit("codeText")
      return ok(code)
    }
    token.type = "codeTextData"
    return data(code)
  }
}

// node_modules/micromark-util-subtokenize/index.js
function subtokenize(events) {
  const jumps = {}
  let index2 = -1
  let event
  let lineIndex
  let otherIndex
  let otherEvent
  let parameters
  let subevents
  let more
  while (++index2 < events.length) {
    while (index2 in jumps) {
      index2 = jumps[index2]
    }
    event = events[index2]
    if (
      index2 &&
      event[1].type === "chunkFlow" &&
      events[index2 - 1][1].type === "listItemPrefix"
    ) {
      subevents = event[1]._tokenizer.events
      otherIndex = 0
      if (
        otherIndex < subevents.length &&
        subevents[otherIndex][1].type === "lineEndingBlank"
      ) {
        otherIndex += 2
      }
      if (
        otherIndex < subevents.length &&
        subevents[otherIndex][1].type === "content"
      ) {
        while (++otherIndex < subevents.length) {
          if (subevents[otherIndex][1].type === "content") {
            break
          }
          if (subevents[otherIndex][1].type === "chunkText") {
            subevents[otherIndex][1]._isInFirstContentOfListItem = true
            otherIndex++
          }
        }
      }
    }
    if (event[0] === "enter") {
      if (event[1].contentType) {
        Object.assign(jumps, subcontent(events, index2))
        index2 = jumps[index2]
        more = true
      }
    } else if (event[1]._container) {
      otherIndex = index2
      lineIndex = void 0
      while (otherIndex--) {
        otherEvent = events[otherIndex]
        if (
          otherEvent[1].type === "lineEnding" ||
          otherEvent[1].type === "lineEndingBlank"
        ) {
          if (otherEvent[0] === "enter") {
            if (lineIndex) {
              events[lineIndex][1].type = "lineEndingBlank"
            }
            otherEvent[1].type = "lineEnding"
            lineIndex = otherIndex
          }
        } else {
          break
        }
      }
      if (lineIndex) {
        event[1].end = Object.assign({}, events[lineIndex][1].start)
        parameters = events.slice(lineIndex, index2)
        parameters.unshift(event)
        splice(events, lineIndex, index2 - lineIndex + 1, parameters)
      }
    }
  }
  return !more
}
function subcontent(events, eventIndex) {
  const token = events[eventIndex][1]
  const context = events[eventIndex][2]
  let startPosition = eventIndex - 1
  const startPositions = []
  const tokenizer =
    token._tokenizer || context.parser[token.contentType](token.start)
  const childEvents = tokenizer.events
  const jumps = []
  const gaps = {}
  let stream
  let previous2
  let index2 = -1
  let current = token
  let adjust = 0
  let start = 0
  const breaks = [start]
  while (current) {
    while (events[++startPosition][1] !== current) {}
    startPositions.push(startPosition)
    if (!current._tokenizer) {
      stream = context.sliceStream(current)
      if (!current.next) {
        stream.push(null)
      }
      if (previous2) {
        tokenizer.defineSkip(current.start)
      }
      if (current._isInFirstContentOfListItem) {
        tokenizer._gfmTasklistFirstContentOfListItem = true
      }
      tokenizer.write(stream)
      if (current._isInFirstContentOfListItem) {
        tokenizer._gfmTasklistFirstContentOfListItem = void 0
      }
    }
    previous2 = current
    current = current.next
  }
  current = token
  while (++index2 < childEvents.length) {
    if (
      childEvents[index2][0] === "exit" &&
      childEvents[index2 - 1][0] === "enter" &&
      childEvents[index2][1].type === childEvents[index2 - 1][1].type &&
      childEvents[index2][1].start.line !== childEvents[index2][1].end.line
    ) {
      start = index2 + 1
      breaks.push(start)
      current._tokenizer = void 0
      current.previous = void 0
      current = current.next
    }
  }
  tokenizer.events = []
  if (current) {
    current._tokenizer = void 0
    current.previous = void 0
  } else {
    breaks.pop()
  }
  index2 = breaks.length
  while (index2--) {
    const slice = childEvents.slice(breaks[index2], breaks[index2 + 1])
    const start2 = startPositions.pop()
    jumps.unshift([start2, start2 + slice.length - 1])
    splice(events, start2, 2, slice)
  }
  index2 = -1
  while (++index2 < jumps.length) {
    gaps[adjust + jumps[index2][0]] = adjust + jumps[index2][1]
    adjust += jumps[index2][1] - jumps[index2][0] - 1
  }
  return gaps
}

// node_modules/micromark-core-commonmark/lib/content.js
var content2 = {
  tokenize: tokenizeContent,
  resolve: resolveContent,
}
var continuationConstruct = {
  tokenize: tokenizeContinuation,
  partial: true,
}
function resolveContent(events) {
  subtokenize(events)
  return events
}
function tokenizeContent(effects, ok) {
  let previous2
  return start
  function start(code) {
    effects.enter("content")
    previous2 = effects.enter("chunkContent", {
      contentType: "content",
    })
    return data(code)
  }
  function data(code) {
    if (code === null) {
      return contentEnd(code)
    }
    if (markdownLineEnding(code)) {
      return effects.check(
        continuationConstruct,
        contentContinue,
        contentEnd,
      )(code)
    }
    effects.consume(code)
    return data
  }
  function contentEnd(code) {
    effects.exit("chunkContent")
    effects.exit("content")
    return ok(code)
  }
  function contentContinue(code) {
    effects.consume(code)
    effects.exit("chunkContent")
    previous2.next = effects.enter("chunkContent", {
      contentType: "content",
      previous: previous2,
    })
    previous2 = previous2.next
    return data
  }
}
function tokenizeContinuation(effects, ok, nok) {
  const self = this
  return startLookahead
  function startLookahead(code) {
    effects.exit("chunkContent")
    effects.enter("lineEnding")
    effects.consume(code)
    effects.exit("lineEnding")
    return factorySpace(effects, prefixed, "linePrefix")
  }
  function prefixed(code) {
    if (code === null || markdownLineEnding(code)) {
      return nok(code)
    }
    const tail = self.events[self.events.length - 1]
    if (
      !self.parser.constructs.disable.null.includes("codeIndented") &&
      tail &&
      tail[1].type === "linePrefix" &&
      tail[2].sliceSerialize(tail[1], true).length >= 4
    ) {
      return ok(code)
    }
    return effects.interrupt(self.parser.constructs.flow, nok, ok)(code)
  }
}

// node_modules/micromark-factory-destination/index.js
function factoryDestination(
  effects,
  ok,
  nok,
  type,
  literalType,
  literalMarkerType,
  rawType,
  stringType,
  max,
) {
  const limit = max || Number.POSITIVE_INFINITY
  let balance = 0
  return start
  function start(code) {
    if (code === 60) {
      effects.enter(type)
      effects.enter(literalType)
      effects.enter(literalMarkerType)
      effects.consume(code)
      effects.exit(literalMarkerType)
      return destinationEnclosedBefore
    }
    if (code === null || code === 41 || asciiControl(code)) {
      return nok(code)
    }
    effects.enter(type)
    effects.enter(rawType)
    effects.enter(stringType)
    effects.enter("chunkString", {
      contentType: "string",
    })
    return destinationRaw(code)
  }
  function destinationEnclosedBefore(code) {
    if (code === 62) {
      effects.enter(literalMarkerType)
      effects.consume(code)
      effects.exit(literalMarkerType)
      effects.exit(literalType)
      effects.exit(type)
      return ok
    }
    effects.enter(stringType)
    effects.enter("chunkString", {
      contentType: "string",
    })
    return destinationEnclosed(code)
  }
  function destinationEnclosed(code) {
    if (code === 62) {
      effects.exit("chunkString")
      effects.exit(stringType)
      return destinationEnclosedBefore(code)
    }
    if (code === null || code === 60 || markdownLineEnding(code)) {
      return nok(code)
    }
    effects.consume(code)
    return code === 92 ? destinationEnclosedEscape : destinationEnclosed
  }
  function destinationEnclosedEscape(code) {
    if (code === 60 || code === 62 || code === 92) {
      effects.consume(code)
      return destinationEnclosed
    }
    return destinationEnclosed(code)
  }
  function destinationRaw(code) {
    if (code === 40) {
      if (++balance > limit) return nok(code)
      effects.consume(code)
      return destinationRaw
    }
    if (code === 41) {
      if (!balance--) {
        effects.exit("chunkString")
        effects.exit(stringType)
        effects.exit(rawType)
        effects.exit(type)
        return ok(code)
      }
      effects.consume(code)
      return destinationRaw
    }
    if (code === null || markdownLineEndingOrSpace(code)) {
      if (balance) return nok(code)
      effects.exit("chunkString")
      effects.exit(stringType)
      effects.exit(rawType)
      effects.exit(type)
      return ok(code)
    }
    if (asciiControl(code)) return nok(code)
    effects.consume(code)
    return code === 92 ? destinationRawEscape : destinationRaw
  }
  function destinationRawEscape(code) {
    if (code === 40 || code === 41 || code === 92) {
      effects.consume(code)
      return destinationRaw
    }
    return destinationRaw(code)
  }
}

// node_modules/micromark-factory-label/index.js
function factoryLabel(effects, ok, nok, type, markerType, stringType) {
  const self = this
  let size = 0
  let data
  return start
  function start(code) {
    effects.enter(type)
    effects.enter(markerType)
    effects.consume(code)
    effects.exit(markerType)
    effects.enter(stringType)
    return atBreak
  }
  function atBreak(code) {
    if (
      code === null ||
      code === 91 ||
      (code === 93 && !data) ||
      (code === 94 &&
        !size &&
        "_hiddenFootnoteSupport" in self.parser.constructs) ||
      size > 999
    ) {
      return nok(code)
    }
    if (code === 93) {
      effects.exit(stringType)
      effects.enter(markerType)
      effects.consume(code)
      effects.exit(markerType)
      effects.exit(type)
      return ok
    }
    if (markdownLineEnding(code)) {
      effects.enter("lineEnding")
      effects.consume(code)
      effects.exit("lineEnding")
      return atBreak
    }
    effects.enter("chunkString", {
      contentType: "string",
    })
    return label(code)
  }
  function label(code) {
    if (
      code === null ||
      code === 91 ||
      code === 93 ||
      markdownLineEnding(code) ||
      size++ > 999
    ) {
      effects.exit("chunkString")
      return atBreak(code)
    }
    effects.consume(code)
    data = data || !markdownSpace(code)
    return code === 92 ? labelEscape : label
  }
  function labelEscape(code) {
    if (code === 91 || code === 92 || code === 93) {
      effects.consume(code)
      size++
      return label
    }
    return label(code)
  }
}

// node_modules/micromark-factory-title/index.js
function factoryTitle(effects, ok, nok, type, markerType, stringType) {
  let marker
  return start
  function start(code) {
    effects.enter(type)
    effects.enter(markerType)
    effects.consume(code)
    effects.exit(markerType)
    marker = code === 40 ? 41 : code
    return atFirstTitleBreak
  }
  function atFirstTitleBreak(code) {
    if (code === marker) {
      effects.enter(markerType)
      effects.consume(code)
      effects.exit(markerType)
      effects.exit(type)
      return ok
    }
    effects.enter(stringType)
    return atTitleBreak(code)
  }
  function atTitleBreak(code) {
    if (code === marker) {
      effects.exit(stringType)
      return atFirstTitleBreak(marker)
    }
    if (code === null) {
      return nok(code)
    }
    if (markdownLineEnding(code)) {
      effects.enter("lineEnding")
      effects.consume(code)
      effects.exit("lineEnding")
      return factorySpace(effects, atTitleBreak, "linePrefix")
    }
    effects.enter("chunkString", {
      contentType: "string",
    })
    return title(code)
  }
  function title(code) {
    if (code === marker || code === null || markdownLineEnding(code)) {
      effects.exit("chunkString")
      return atTitleBreak(code)
    }
    effects.consume(code)
    return code === 92 ? titleEscape : title
  }
  function titleEscape(code) {
    if (code === marker || code === 92) {
      effects.consume(code)
      return title
    }
    return title(code)
  }
}

// node_modules/micromark-factory-whitespace/index.js
function factoryWhitespace(effects, ok) {
  let seen
  return start
  function start(code) {
    if (markdownLineEnding(code)) {
      effects.enter("lineEnding")
      effects.consume(code)
      effects.exit("lineEnding")
      seen = true
      return start
    }
    if (markdownSpace(code)) {
      return factorySpace(
        effects,
        start,
        seen ? "linePrefix" : "lineSuffix",
      )(code)
    }
    return ok(code)
  }
}

// node_modules/micromark-util-normalize-identifier/index.js
function normalizeIdentifier(value2) {
  return value2
    .replace(/[\t\n\r ]+/g, " ")
    .replace(/^ | $/g, "")
    .toLowerCase()
    .toUpperCase()
}

// node_modules/micromark-core-commonmark/lib/definition.js
var definition = {
  name: "definition",
  tokenize: tokenizeDefinition,
}
var titleConstruct = {
  tokenize: tokenizeTitle,
  partial: true,
}
function tokenizeDefinition(effects, ok, nok) {
  const self = this
  let identifier
  return start
  function start(code) {
    effects.enter("definition")
    return factoryLabel.call(
      self,
      effects,
      labelAfter,
      nok,
      "definitionLabel",
      "definitionLabelMarker",
      "definitionLabelString",
    )(code)
  }
  function labelAfter(code) {
    identifier = normalizeIdentifier(
      self.sliceSerialize(self.events[self.events.length - 1][1]).slice(1, -1),
    )
    if (code === 58) {
      effects.enter("definitionMarker")
      effects.consume(code)
      effects.exit("definitionMarker")
      return factoryWhitespace(
        effects,
        factoryDestination(
          effects,
          effects.attempt(
            titleConstruct,
            factorySpace(effects, after, "whitespace"),
            factorySpace(effects, after, "whitespace"),
          ),
          nok,
          "definitionDestination",
          "definitionDestinationLiteral",
          "definitionDestinationLiteralMarker",
          "definitionDestinationRaw",
          "definitionDestinationString",
        ),
      )
    }
    return nok(code)
  }
  function after(code) {
    if (code === null || markdownLineEnding(code)) {
      effects.exit("definition")
      if (!self.parser.defined.includes(identifier)) {
        self.parser.defined.push(identifier)
      }
      return ok(code)
    }
    return nok(code)
  }
}
function tokenizeTitle(effects, ok, nok) {
  return start
  function start(code) {
    return markdownLineEndingOrSpace(code)
      ? factoryWhitespace(effects, before)(code)
      : nok(code)
  }
  function before(code) {
    if (code === 34 || code === 39 || code === 40) {
      return factoryTitle(
        effects,
        factorySpace(effects, after, "whitespace"),
        nok,
        "definitionTitle",
        "definitionTitleMarker",
        "definitionTitleString",
      )(code)
    }
    return nok(code)
  }
  function after(code) {
    return code === null || markdownLineEnding(code) ? ok(code) : nok(code)
  }
}

// node_modules/micromark-core-commonmark/lib/hard-break-escape.js
var hardBreakEscape = {
  name: "hardBreakEscape",
  tokenize: tokenizeHardBreakEscape,
}
function tokenizeHardBreakEscape(effects, ok, nok) {
  return start
  function start(code) {
    effects.enter("hardBreakEscape")
    effects.enter("escapeMarker")
    effects.consume(code)
    return open
  }
  function open(code) {
    if (markdownLineEnding(code)) {
      effects.exit("escapeMarker")
      effects.exit("hardBreakEscape")
      return ok(code)
    }
    return nok(code)
  }
}

// node_modules/micromark-core-commonmark/lib/heading-atx.js
var headingAtx = {
  name: "headingAtx",
  tokenize: tokenizeHeadingAtx,
  resolve: resolveHeadingAtx,
}
function resolveHeadingAtx(events, context) {
  let contentEnd = events.length - 2
  let contentStart = 3
  let content3
  let text3
  if (events[contentStart][1].type === "whitespace") {
    contentStart += 2
  }
  if (
    contentEnd - 2 > contentStart &&
    events[contentEnd][1].type === "whitespace"
  ) {
    contentEnd -= 2
  }
  if (
    events[contentEnd][1].type === "atxHeadingSequence" &&
    (contentStart === contentEnd - 1 ||
      (contentEnd - 4 > contentStart &&
        events[contentEnd - 2][1].type === "whitespace"))
  ) {
    contentEnd -= contentStart + 1 === contentEnd ? 2 : 4
  }
  if (contentEnd > contentStart) {
    content3 = {
      type: "atxHeadingText",
      start: events[contentStart][1].start,
      end: events[contentEnd][1].end,
    }
    text3 = {
      type: "chunkText",
      start: events[contentStart][1].start,
      end: events[contentEnd][1].end,
      contentType: "text",
    }
    splice(events, contentStart, contentEnd - contentStart + 1, [
      ["enter", content3, context],
      ["enter", text3, context],
      ["exit", text3, context],
      ["exit", content3, context],
    ])
  }
  return events
}
function tokenizeHeadingAtx(effects, ok, nok) {
  const self = this
  let size = 0
  return start
  function start(code) {
    effects.enter("atxHeading")
    effects.enter("atxHeadingSequence")
    return fenceOpenInside(code)
  }
  function fenceOpenInside(code) {
    if (code === 35 && size++ < 6) {
      effects.consume(code)
      return fenceOpenInside
    }
    if (code === null || markdownLineEndingOrSpace(code)) {
      effects.exit("atxHeadingSequence")
      return self.interrupt ? ok(code) : headingBreak(code)
    }
    return nok(code)
  }
  function headingBreak(code) {
    if (code === 35) {
      effects.enter("atxHeadingSequence")
      return sequence(code)
    }
    if (code === null || markdownLineEnding(code)) {
      effects.exit("atxHeading")
      return ok(code)
    }
    if (markdownSpace(code)) {
      return factorySpace(effects, headingBreak, "whitespace")(code)
    }
    effects.enter("atxHeadingText")
    return data(code)
  }
  function sequence(code) {
    if (code === 35) {
      effects.consume(code)
      return sequence
    }
    effects.exit("atxHeadingSequence")
    return headingBreak(code)
  }
  function data(code) {
    if (code === null || code === 35 || markdownLineEndingOrSpace(code)) {
      effects.exit("atxHeadingText")
      return headingBreak(code)
    }
    effects.consume(code)
    return data
  }
}

// node_modules/micromark-util-html-tag-name/index.js
var htmlBlockNames = [
  "address",
  "article",
  "aside",
  "base",
  "basefont",
  "blockquote",
  "body",
  "caption",
  "center",
  "col",
  "colgroup",
  "dd",
  "details",
  "dialog",
  "dir",
  "div",
  "dl",
  "dt",
  "fieldset",
  "figcaption",
  "figure",
  "footer",
  "form",
  "frame",
  "frameset",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "head",
  "header",
  "hr",
  "html",
  "iframe",
  "legend",
  "li",
  "link",
  "main",
  "menu",
  "menuitem",
  "nav",
  "noframes",
  "ol",
  "optgroup",
  "option",
  "p",
  "param",
  "section",
  "source",
  "summary",
  "table",
  "tbody",
  "td",
  "tfoot",
  "th",
  "thead",
  "title",
  "tr",
  "track",
  "ul",
]
var htmlRawNames = ["pre", "script", "style", "textarea"]

// node_modules/micromark-core-commonmark/lib/html-flow.js
var htmlFlow = {
  name: "htmlFlow",
  tokenize: tokenizeHtmlFlow,
  resolveTo: resolveToHtmlFlow,
  concrete: true,
}
var nextBlankConstruct = {
  tokenize: tokenizeNextBlank,
  partial: true,
}
function resolveToHtmlFlow(events) {
  let index2 = events.length
  while (index2--) {
    if (
      events[index2][0] === "enter" &&
      events[index2][1].type === "htmlFlow"
    ) {
      break
    }
  }
  if (index2 > 1 && events[index2 - 2][1].type === "linePrefix") {
    events[index2][1].start = events[index2 - 2][1].start
    events[index2 + 1][1].start = events[index2 - 2][1].start
    events.splice(index2 - 2, 2)
  }
  return events
}
function tokenizeHtmlFlow(effects, ok, nok) {
  const self = this
  let kind
  let startTag
  let buffer2
  let index2
  let marker
  return start
  function start(code) {
    effects.enter("htmlFlow")
    effects.enter("htmlFlowData")
    effects.consume(code)
    return open
  }
  function open(code) {
    if (code === 33) {
      effects.consume(code)
      return declarationStart
    }
    if (code === 47) {
      effects.consume(code)
      return tagCloseStart
    }
    if (code === 63) {
      effects.consume(code)
      kind = 3
      return self.interrupt ? ok : continuationDeclarationInside
    }
    if (asciiAlpha(code)) {
      effects.consume(code)
      buffer2 = String.fromCharCode(code)
      startTag = true
      return tagName
    }
    return nok(code)
  }
  function declarationStart(code) {
    if (code === 45) {
      effects.consume(code)
      kind = 2
      return commentOpenInside
    }
    if (code === 91) {
      effects.consume(code)
      kind = 5
      buffer2 = "CDATA["
      index2 = 0
      return cdataOpenInside
    }
    if (asciiAlpha(code)) {
      effects.consume(code)
      kind = 4
      return self.interrupt ? ok : continuationDeclarationInside
    }
    return nok(code)
  }
  function commentOpenInside(code) {
    if (code === 45) {
      effects.consume(code)
      return self.interrupt ? ok : continuationDeclarationInside
    }
    return nok(code)
  }
  function cdataOpenInside(code) {
    if (code === buffer2.charCodeAt(index2++)) {
      effects.consume(code)
      return index2 === buffer2.length
        ? self.interrupt
          ? ok
          : continuation
        : cdataOpenInside
    }
    return nok(code)
  }
  function tagCloseStart(code) {
    if (asciiAlpha(code)) {
      effects.consume(code)
      buffer2 = String.fromCharCode(code)
      return tagName
    }
    return nok(code)
  }
  function tagName(code) {
    if (
      code === null ||
      code === 47 ||
      code === 62 ||
      markdownLineEndingOrSpace(code)
    ) {
      if (
        code !== 47 &&
        startTag &&
        htmlRawNames.includes(buffer2.toLowerCase())
      ) {
        kind = 1
        return self.interrupt ? ok(code) : continuation(code)
      }
      if (htmlBlockNames.includes(buffer2.toLowerCase())) {
        kind = 6
        if (code === 47) {
          effects.consume(code)
          return basicSelfClosing
        }
        return self.interrupt ? ok(code) : continuation(code)
      }
      kind = 7
      return self.interrupt && !self.parser.lazy[self.now().line]
        ? nok(code)
        : startTag
        ? completeAttributeNameBefore(code)
        : completeClosingTagAfter(code)
    }
    if (code === 45 || asciiAlphanumeric(code)) {
      effects.consume(code)
      buffer2 += String.fromCharCode(code)
      return tagName
    }
    return nok(code)
  }
  function basicSelfClosing(code) {
    if (code === 62) {
      effects.consume(code)
      return self.interrupt ? ok : continuation
    }
    return nok(code)
  }
  function completeClosingTagAfter(code) {
    if (markdownSpace(code)) {
      effects.consume(code)
      return completeClosingTagAfter
    }
    return completeEnd(code)
  }
  function completeAttributeNameBefore(code) {
    if (code === 47) {
      effects.consume(code)
      return completeEnd
    }
    if (code === 58 || code === 95 || asciiAlpha(code)) {
      effects.consume(code)
      return completeAttributeName
    }
    if (markdownSpace(code)) {
      effects.consume(code)
      return completeAttributeNameBefore
    }
    return completeEnd(code)
  }
  function completeAttributeName(code) {
    if (
      code === 45 ||
      code === 46 ||
      code === 58 ||
      code === 95 ||
      asciiAlphanumeric(code)
    ) {
      effects.consume(code)
      return completeAttributeName
    }
    return completeAttributeNameAfter(code)
  }
  function completeAttributeNameAfter(code) {
    if (code === 61) {
      effects.consume(code)
      return completeAttributeValueBefore
    }
    if (markdownSpace(code)) {
      effects.consume(code)
      return completeAttributeNameAfter
    }
    return completeAttributeNameBefore(code)
  }
  function completeAttributeValueBefore(code) {
    if (
      code === null ||
      code === 60 ||
      code === 61 ||
      code === 62 ||
      code === 96
    ) {
      return nok(code)
    }
    if (code === 34 || code === 39) {
      effects.consume(code)
      marker = code
      return completeAttributeValueQuoted
    }
    if (markdownSpace(code)) {
      effects.consume(code)
      return completeAttributeValueBefore
    }
    marker = null
    return completeAttributeValueUnquoted(code)
  }
  function completeAttributeValueQuoted(code) {
    if (code === null || markdownLineEnding(code)) {
      return nok(code)
    }
    if (code === marker) {
      effects.consume(code)
      return completeAttributeValueQuotedAfter
    }
    effects.consume(code)
    return completeAttributeValueQuoted
  }
  function completeAttributeValueUnquoted(code) {
    if (
      code === null ||
      code === 34 ||
      code === 39 ||
      code === 60 ||
      code === 61 ||
      code === 62 ||
      code === 96 ||
      markdownLineEndingOrSpace(code)
    ) {
      return completeAttributeNameAfter(code)
    }
    effects.consume(code)
    return completeAttributeValueUnquoted
  }
  function completeAttributeValueQuotedAfter(code) {
    if (code === 47 || code === 62 || markdownSpace(code)) {
      return completeAttributeNameBefore(code)
    }
    return nok(code)
  }
  function completeEnd(code) {
    if (code === 62) {
      effects.consume(code)
      return completeAfter
    }
    return nok(code)
  }
  function completeAfter(code) {
    if (markdownSpace(code)) {
      effects.consume(code)
      return completeAfter
    }
    return code === null || markdownLineEnding(code)
      ? continuation(code)
      : nok(code)
  }
  function continuation(code) {
    if (code === 45 && kind === 2) {
      effects.consume(code)
      return continuationCommentInside
    }
    if (code === 60 && kind === 1) {
      effects.consume(code)
      return continuationRawTagOpen
    }
    if (code === 62 && kind === 4) {
      effects.consume(code)
      return continuationClose
    }
    if (code === 63 && kind === 3) {
      effects.consume(code)
      return continuationDeclarationInside
    }
    if (code === 93 && kind === 5) {
      effects.consume(code)
      return continuationCharacterDataInside
    }
    if (markdownLineEnding(code) && (kind === 6 || kind === 7)) {
      return effects.check(
        nextBlankConstruct,
        continuationClose,
        continuationAtLineEnding,
      )(code)
    }
    if (code === null || markdownLineEnding(code)) {
      return continuationAtLineEnding(code)
    }
    effects.consume(code)
    return continuation
  }
  function continuationAtLineEnding(code) {
    effects.exit("htmlFlowData")
    return htmlContinueStart(code)
  }
  function htmlContinueStart(code) {
    if (code === null) {
      return done(code)
    }
    if (markdownLineEnding(code)) {
      return effects.attempt(
        {
          tokenize: htmlLineEnd,
          partial: true,
        },
        htmlContinueStart,
        done,
      )(code)
    }
    effects.enter("htmlFlowData")
    return continuation(code)
  }
  function htmlLineEnd(effects2, ok2, nok2) {
    return start2
    function start2(code) {
      effects2.enter("lineEnding")
      effects2.consume(code)
      effects2.exit("lineEnding")
      return lineStart
    }
    function lineStart(code) {
      return self.parser.lazy[self.now().line] ? nok2(code) : ok2(code)
    }
  }
  function continuationCommentInside(code) {
    if (code === 45) {
      effects.consume(code)
      return continuationDeclarationInside
    }
    return continuation(code)
  }
  function continuationRawTagOpen(code) {
    if (code === 47) {
      effects.consume(code)
      buffer2 = ""
      return continuationRawEndTag
    }
    return continuation(code)
  }
  function continuationRawEndTag(code) {
    if (code === 62 && htmlRawNames.includes(buffer2.toLowerCase())) {
      effects.consume(code)
      return continuationClose
    }
    if (asciiAlpha(code) && buffer2.length < 8) {
      effects.consume(code)
      buffer2 += String.fromCharCode(code)
      return continuationRawEndTag
    }
    return continuation(code)
  }
  function continuationCharacterDataInside(code) {
    if (code === 93) {
      effects.consume(code)
      return continuationDeclarationInside
    }
    return continuation(code)
  }
  function continuationDeclarationInside(code) {
    if (code === 62) {
      effects.consume(code)
      return continuationClose
    }
    return continuation(code)
  }
  function continuationClose(code) {
    if (code === null || markdownLineEnding(code)) {
      effects.exit("htmlFlowData")
      return done(code)
    }
    effects.consume(code)
    return continuationClose
  }
  function done(code) {
    effects.exit("htmlFlow")
    return ok(code)
  }
}
function tokenizeNextBlank(effects, ok, nok) {
  return start
  function start(code) {
    effects.exit("htmlFlowData")
    effects.enter("lineEndingBlank")
    effects.consume(code)
    effects.exit("lineEndingBlank")
    return effects.attempt(blankLine, ok, nok)
  }
}

// node_modules/micromark-core-commonmark/lib/html-text.js
var htmlText = {
  name: "htmlText",
  tokenize: tokenizeHtmlText,
}
function tokenizeHtmlText(effects, ok, nok) {
  const self = this
  let marker
  let buffer2
  let index2
  let returnState
  return start
  function start(code) {
    effects.enter("htmlText")
    effects.enter("htmlTextData")
    effects.consume(code)
    return open
  }
  function open(code) {
    if (code === 33) {
      effects.consume(code)
      return declarationOpen
    }
    if (code === 47) {
      effects.consume(code)
      return tagCloseStart
    }
    if (code === 63) {
      effects.consume(code)
      return instruction
    }
    if (asciiAlpha(code)) {
      effects.consume(code)
      return tagOpen
    }
    return nok(code)
  }
  function declarationOpen(code) {
    if (code === 45) {
      effects.consume(code)
      return commentOpen
    }
    if (code === 91) {
      effects.consume(code)
      buffer2 = "CDATA["
      index2 = 0
      return cdataOpen
    }
    if (asciiAlpha(code)) {
      effects.consume(code)
      return declaration
    }
    return nok(code)
  }
  function commentOpen(code) {
    if (code === 45) {
      effects.consume(code)
      return commentStart
    }
    return nok(code)
  }
  function commentStart(code) {
    if (code === null || code === 62) {
      return nok(code)
    }
    if (code === 45) {
      effects.consume(code)
      return commentStartDash
    }
    return comment(code)
  }
  function commentStartDash(code) {
    if (code === null || code === 62) {
      return nok(code)
    }
    return comment(code)
  }
  function comment(code) {
    if (code === null) {
      return nok(code)
    }
    if (code === 45) {
      effects.consume(code)
      return commentClose
    }
    if (markdownLineEnding(code)) {
      returnState = comment
      return atLineEnding(code)
    }
    effects.consume(code)
    return comment
  }
  function commentClose(code) {
    if (code === 45) {
      effects.consume(code)
      return end
    }
    return comment(code)
  }
  function cdataOpen(code) {
    if (code === buffer2.charCodeAt(index2++)) {
      effects.consume(code)
      return index2 === buffer2.length ? cdata : cdataOpen
    }
    return nok(code)
  }
  function cdata(code) {
    if (code === null) {
      return nok(code)
    }
    if (code === 93) {
      effects.consume(code)
      return cdataClose
    }
    if (markdownLineEnding(code)) {
      returnState = cdata
      return atLineEnding(code)
    }
    effects.consume(code)
    return cdata
  }
  function cdataClose(code) {
    if (code === 93) {
      effects.consume(code)
      return cdataEnd
    }
    return cdata(code)
  }
  function cdataEnd(code) {
    if (code === 62) {
      return end(code)
    }
    if (code === 93) {
      effects.consume(code)
      return cdataEnd
    }
    return cdata(code)
  }
  function declaration(code) {
    if (code === null || code === 62) {
      return end(code)
    }
    if (markdownLineEnding(code)) {
      returnState = declaration
      return atLineEnding(code)
    }
    effects.consume(code)
    return declaration
  }
  function instruction(code) {
    if (code === null) {
      return nok(code)
    }
    if (code === 63) {
      effects.consume(code)
      return instructionClose
    }
    if (markdownLineEnding(code)) {
      returnState = instruction
      return atLineEnding(code)
    }
    effects.consume(code)
    return instruction
  }
  function instructionClose(code) {
    return code === 62 ? end(code) : instruction(code)
  }
  function tagCloseStart(code) {
    if (asciiAlpha(code)) {
      effects.consume(code)
      return tagClose
    }
    return nok(code)
  }
  function tagClose(code) {
    if (code === 45 || asciiAlphanumeric(code)) {
      effects.consume(code)
      return tagClose
    }
    return tagCloseBetween(code)
  }
  function tagCloseBetween(code) {
    if (markdownLineEnding(code)) {
      returnState = tagCloseBetween
      return atLineEnding(code)
    }
    if (markdownSpace(code)) {
      effects.consume(code)
      return tagCloseBetween
    }
    return end(code)
  }
  function tagOpen(code) {
    if (code === 45 || asciiAlphanumeric(code)) {
      effects.consume(code)
      return tagOpen
    }
    if (code === 47 || code === 62 || markdownLineEndingOrSpace(code)) {
      return tagOpenBetween(code)
    }
    return nok(code)
  }
  function tagOpenBetween(code) {
    if (code === 47) {
      effects.consume(code)
      return end
    }
    if (code === 58 || code === 95 || asciiAlpha(code)) {
      effects.consume(code)
      return tagOpenAttributeName
    }
    if (markdownLineEnding(code)) {
      returnState = tagOpenBetween
      return atLineEnding(code)
    }
    if (markdownSpace(code)) {
      effects.consume(code)
      return tagOpenBetween
    }
    return end(code)
  }
  function tagOpenAttributeName(code) {
    if (
      code === 45 ||
      code === 46 ||
      code === 58 ||
      code === 95 ||
      asciiAlphanumeric(code)
    ) {
      effects.consume(code)
      return tagOpenAttributeName
    }
    return tagOpenAttributeNameAfter(code)
  }
  function tagOpenAttributeNameAfter(code) {
    if (code === 61) {
      effects.consume(code)
      return tagOpenAttributeValueBefore
    }
    if (markdownLineEnding(code)) {
      returnState = tagOpenAttributeNameAfter
      return atLineEnding(code)
    }
    if (markdownSpace(code)) {
      effects.consume(code)
      return tagOpenAttributeNameAfter
    }
    return tagOpenBetween(code)
  }
  function tagOpenAttributeValueBefore(code) {
    if (
      code === null ||
      code === 60 ||
      code === 61 ||
      code === 62 ||
      code === 96
    ) {
      return nok(code)
    }
    if (code === 34 || code === 39) {
      effects.consume(code)
      marker = code
      return tagOpenAttributeValueQuoted
    }
    if (markdownLineEnding(code)) {
      returnState = tagOpenAttributeValueBefore
      return atLineEnding(code)
    }
    if (markdownSpace(code)) {
      effects.consume(code)
      return tagOpenAttributeValueBefore
    }
    effects.consume(code)
    marker = void 0
    return tagOpenAttributeValueUnquoted
  }
  function tagOpenAttributeValueQuoted(code) {
    if (code === marker) {
      effects.consume(code)
      return tagOpenAttributeValueQuotedAfter
    }
    if (code === null) {
      return nok(code)
    }
    if (markdownLineEnding(code)) {
      returnState = tagOpenAttributeValueQuoted
      return atLineEnding(code)
    }
    effects.consume(code)
    return tagOpenAttributeValueQuoted
  }
  function tagOpenAttributeValueQuotedAfter(code) {
    if (code === 62 || code === 47 || markdownLineEndingOrSpace(code)) {
      return tagOpenBetween(code)
    }
    return nok(code)
  }
  function tagOpenAttributeValueUnquoted(code) {
    if (
      code === null ||
      code === 34 ||
      code === 39 ||
      code === 60 ||
      code === 61 ||
      code === 96
    ) {
      return nok(code)
    }
    if (code === 62 || markdownLineEndingOrSpace(code)) {
      return tagOpenBetween(code)
    }
    effects.consume(code)
    return tagOpenAttributeValueUnquoted
  }
  function atLineEnding(code) {
    effects.exit("htmlTextData")
    effects.enter("lineEnding")
    effects.consume(code)
    effects.exit("lineEnding")
    return factorySpace(
      effects,
      afterPrefix,
      "linePrefix",
      self.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4,
    )
  }
  function afterPrefix(code) {
    effects.enter("htmlTextData")
    return returnState(code)
  }
  function end(code) {
    if (code === 62) {
      effects.consume(code)
      effects.exit("htmlTextData")
      effects.exit("htmlText")
      return ok
    }
    return nok(code)
  }
}

// node_modules/micromark-core-commonmark/lib/label-end.js
var labelEnd = {
  name: "labelEnd",
  tokenize: tokenizeLabelEnd,
  resolveTo: resolveToLabelEnd,
  resolveAll: resolveAllLabelEnd,
}
var resourceConstruct = {
  tokenize: tokenizeResource,
}
var fullReferenceConstruct = {
  tokenize: tokenizeFullReference,
}
var collapsedReferenceConstruct = {
  tokenize: tokenizeCollapsedReference,
}
function resolveAllLabelEnd(events) {
  let index2 = -1
  let token
  while (++index2 < events.length) {
    token = events[index2][1]
    if (
      token.type === "labelImage" ||
      token.type === "labelLink" ||
      token.type === "labelEnd"
    ) {
      events.splice(index2 + 1, token.type === "labelImage" ? 4 : 2)
      token.type = "data"
      index2++
    }
  }
  return events
}
function resolveToLabelEnd(events, context) {
  let index2 = events.length
  let offset = 0
  let token
  let open
  let close2
  let media
  while (index2--) {
    token = events[index2][1]
    if (open) {
      if (
        token.type === "link" ||
        (token.type === "labelLink" && token._inactive)
      ) {
        break
      }
      if (events[index2][0] === "enter" && token.type === "labelLink") {
        token._inactive = true
      }
    } else if (close2) {
      if (
        events[index2][0] === "enter" &&
        (token.type === "labelImage" || token.type === "labelLink") &&
        !token._balanced
      ) {
        open = index2
        if (token.type !== "labelLink") {
          offset = 2
          break
        }
      }
    } else if (token.type === "labelEnd") {
      close2 = index2
    }
  }
  const group = {
    type: events[open][1].type === "labelLink" ? "link" : "image",
    start: Object.assign({}, events[open][1].start),
    end: Object.assign({}, events[events.length - 1][1].end),
  }
  const label = {
    type: "label",
    start: Object.assign({}, events[open][1].start),
    end: Object.assign({}, events[close2][1].end),
  }
  const text3 = {
    type: "labelText",
    start: Object.assign({}, events[open + offset + 2][1].end),
    end: Object.assign({}, events[close2 - 2][1].start),
  }
  media = [
    ["enter", group, context],
    ["enter", label, context],
  ]
  media = push(media, events.slice(open + 1, open + offset + 3))
  media = push(media, [["enter", text3, context]])
  media = push(
    media,
    resolveAll(
      context.parser.constructs.insideSpan.null,
      events.slice(open + offset + 4, close2 - 3),
      context,
    ),
  )
  media = push(media, [
    ["exit", text3, context],
    events[close2 - 2],
    events[close2 - 1],
    ["exit", label, context],
  ])
  media = push(media, events.slice(close2 + 1))
  media = push(media, [["exit", group, context]])
  splice(events, open, events.length, media)
  return events
}
function tokenizeLabelEnd(effects, ok, nok) {
  const self = this
  let index2 = self.events.length
  let labelStart
  let defined
  while (index2--) {
    if (
      (self.events[index2][1].type === "labelImage" ||
        self.events[index2][1].type === "labelLink") &&
      !self.events[index2][1]._balanced
    ) {
      labelStart = self.events[index2][1]
      break
    }
  }
  return start
  function start(code) {
    if (!labelStart) {
      return nok(code)
    }
    if (labelStart._inactive) return balanced(code)
    defined = self.parser.defined.includes(
      normalizeIdentifier(
        self.sliceSerialize({
          start: labelStart.end,
          end: self.now(),
        }),
      ),
    )
    effects.enter("labelEnd")
    effects.enter("labelMarker")
    effects.consume(code)
    effects.exit("labelMarker")
    effects.exit("labelEnd")
    return afterLabelEnd
  }
  function afterLabelEnd(code) {
    if (code === 40) {
      return effects.attempt(
        resourceConstruct,
        ok,
        defined ? ok : balanced,
      )(code)
    }
    if (code === 91) {
      return effects.attempt(
        fullReferenceConstruct,
        ok,
        defined
          ? effects.attempt(collapsedReferenceConstruct, ok, balanced)
          : balanced,
      )(code)
    }
    return defined ? ok(code) : balanced(code)
  }
  function balanced(code) {
    labelStart._balanced = true
    return nok(code)
  }
}
function tokenizeResource(effects, ok, nok) {
  return start
  function start(code) {
    effects.enter("resource")
    effects.enter("resourceMarker")
    effects.consume(code)
    effects.exit("resourceMarker")
    return factoryWhitespace(effects, open)
  }
  function open(code) {
    if (code === 41) {
      return end(code)
    }
    return factoryDestination(
      effects,
      destinationAfter,
      nok,
      "resourceDestination",
      "resourceDestinationLiteral",
      "resourceDestinationLiteralMarker",
      "resourceDestinationRaw",
      "resourceDestinationString",
      3,
    )(code)
  }
  function destinationAfter(code) {
    return markdownLineEndingOrSpace(code)
      ? factoryWhitespace(effects, between)(code)
      : end(code)
  }
  function between(code) {
    if (code === 34 || code === 39 || code === 40) {
      return factoryTitle(
        effects,
        factoryWhitespace(effects, end),
        nok,
        "resourceTitle",
        "resourceTitleMarker",
        "resourceTitleString",
      )(code)
    }
    return end(code)
  }
  function end(code) {
    if (code === 41) {
      effects.enter("resourceMarker")
      effects.consume(code)
      effects.exit("resourceMarker")
      effects.exit("resource")
      return ok
    }
    return nok(code)
  }
}
function tokenizeFullReference(effects, ok, nok) {
  const self = this
  return start
  function start(code) {
    return factoryLabel.call(
      self,
      effects,
      afterLabel,
      nok,
      "reference",
      "referenceMarker",
      "referenceString",
    )(code)
  }
  function afterLabel(code) {
    return self.parser.defined.includes(
      normalizeIdentifier(
        self
          .sliceSerialize(self.events[self.events.length - 1][1])
          .slice(1, -1),
      ),
    )
      ? ok(code)
      : nok(code)
  }
}
function tokenizeCollapsedReference(effects, ok, nok) {
  return start
  function start(code) {
    effects.enter("reference")
    effects.enter("referenceMarker")
    effects.consume(code)
    effects.exit("referenceMarker")
    return open
  }
  function open(code) {
    if (code === 93) {
      effects.enter("referenceMarker")
      effects.consume(code)
      effects.exit("referenceMarker")
      effects.exit("reference")
      return ok
    }
    return nok(code)
  }
}

// node_modules/micromark-core-commonmark/lib/label-start-image.js
var labelStartImage = {
  name: "labelStartImage",
  tokenize: tokenizeLabelStartImage,
  resolveAll: labelEnd.resolveAll,
}
function tokenizeLabelStartImage(effects, ok, nok) {
  const self = this
  return start
  function start(code) {
    effects.enter("labelImage")
    effects.enter("labelImageMarker")
    effects.consume(code)
    effects.exit("labelImageMarker")
    return open
  }
  function open(code) {
    if (code === 91) {
      effects.enter("labelMarker")
      effects.consume(code)
      effects.exit("labelMarker")
      effects.exit("labelImage")
      return after
    }
    return nok(code)
  }
  function after(code) {
    return code === 94 && "_hiddenFootnoteSupport" in self.parser.constructs
      ? nok(code)
      : ok(code)
  }
}

// node_modules/micromark-core-commonmark/lib/label-start-link.js
var labelStartLink = {
  name: "labelStartLink",
  tokenize: tokenizeLabelStartLink,
  resolveAll: labelEnd.resolveAll,
}
function tokenizeLabelStartLink(effects, ok, nok) {
  const self = this
  return start
  function start(code) {
    effects.enter("labelLink")
    effects.enter("labelMarker")
    effects.consume(code)
    effects.exit("labelMarker")
    effects.exit("labelLink")
    return after
  }
  function after(code) {
    return code === 94 && "_hiddenFootnoteSupport" in self.parser.constructs
      ? nok(code)
      : ok(code)
  }
}

// node_modules/micromark-core-commonmark/lib/line-ending.js
var lineEnding = {
  name: "lineEnding",
  tokenize: tokenizeLineEnding,
}
function tokenizeLineEnding(effects, ok) {
  return start
  function start(code) {
    effects.enter("lineEnding")
    effects.consume(code)
    effects.exit("lineEnding")
    return factorySpace(effects, ok, "linePrefix")
  }
}

// node_modules/micromark-core-commonmark/lib/thematic-break.js
var thematicBreak = {
  name: "thematicBreak",
  tokenize: tokenizeThematicBreak,
}
function tokenizeThematicBreak(effects, ok, nok) {
  let size = 0
  let marker
  return start
  function start(code) {
    effects.enter("thematicBreak")
    marker = code
    return atBreak(code)
  }
  function atBreak(code) {
    if (code === marker) {
      effects.enter("thematicBreakSequence")
      return sequence(code)
    }
    if (markdownSpace(code)) {
      return factorySpace(effects, atBreak, "whitespace")(code)
    }
    if (size < 3 || (code !== null && !markdownLineEnding(code))) {
      return nok(code)
    }
    effects.exit("thematicBreak")
    return ok(code)
  }
  function sequence(code) {
    if (code === marker) {
      effects.consume(code)
      size++
      return sequence
    }
    effects.exit("thematicBreakSequence")
    return atBreak(code)
  }
}

// node_modules/micromark-core-commonmark/lib/list.js
var list = {
  name: "list",
  tokenize: tokenizeListStart,
  continuation: {
    tokenize: tokenizeListContinuation,
  },
  exit: tokenizeListEnd,
}
var listItemPrefixWhitespaceConstruct = {
  tokenize: tokenizeListItemPrefixWhitespace,
  partial: true,
}
var indentConstruct = {
  tokenize: tokenizeIndent,
  partial: true,
}
function tokenizeListStart(effects, ok, nok) {
  const self = this
  const tail = self.events[self.events.length - 1]
  let initialSize =
    tail && tail[1].type === "linePrefix"
      ? tail[2].sliceSerialize(tail[1], true).length
      : 0
  let size = 0
  return start
  function start(code) {
    const kind =
      self.containerState.type ||
      (code === 42 || code === 43 || code === 45
        ? "listUnordered"
        : "listOrdered")
    if (
      kind === "listUnordered"
        ? !self.containerState.marker || code === self.containerState.marker
        : asciiDigit(code)
    ) {
      if (!self.containerState.type) {
        self.containerState.type = kind
        effects.enter(kind, {
          _container: true,
        })
      }
      if (kind === "listUnordered") {
        effects.enter("listItemPrefix")
        return code === 42 || code === 45
          ? effects.check(thematicBreak, nok, atMarker)(code)
          : atMarker(code)
      }
      if (!self.interrupt || code === 49) {
        effects.enter("listItemPrefix")
        effects.enter("listItemValue")
        return inside(code)
      }
    }
    return nok(code)
  }
  function inside(code) {
    if (asciiDigit(code) && ++size < 10) {
      effects.consume(code)
      return inside
    }
    if (
      (!self.interrupt || size < 2) &&
      (self.containerState.marker
        ? code === self.containerState.marker
        : code === 41 || code === 46)
    ) {
      effects.exit("listItemValue")
      return atMarker(code)
    }
    return nok(code)
  }
  function atMarker(code) {
    effects.enter("listItemMarker")
    effects.consume(code)
    effects.exit("listItemMarker")
    self.containerState.marker = self.containerState.marker || code
    return effects.check(
      blankLine,
      self.interrupt ? nok : onBlank,
      effects.attempt(
        listItemPrefixWhitespaceConstruct,
        endOfPrefix,
        otherPrefix,
      ),
    )
  }
  function onBlank(code) {
    self.containerState.initialBlankLine = true
    initialSize++
    return endOfPrefix(code)
  }
  function otherPrefix(code) {
    if (markdownSpace(code)) {
      effects.enter("listItemPrefixWhitespace")
      effects.consume(code)
      effects.exit("listItemPrefixWhitespace")
      return endOfPrefix
    }
    return nok(code)
  }
  function endOfPrefix(code) {
    self.containerState.size =
      initialSize +
      self.sliceSerialize(effects.exit("listItemPrefix"), true).length
    return ok(code)
  }
}
function tokenizeListContinuation(effects, ok, nok) {
  const self = this
  self.containerState._closeFlow = void 0
  return effects.check(blankLine, onBlank, notBlank)
  function onBlank(code) {
    self.containerState.furtherBlankLines =
      self.containerState.furtherBlankLines ||
      self.containerState.initialBlankLine
    return factorySpace(
      effects,
      ok,
      "listItemIndent",
      self.containerState.size + 1,
    )(code)
  }
  function notBlank(code) {
    if (self.containerState.furtherBlankLines || !markdownSpace(code)) {
      self.containerState.furtherBlankLines = void 0
      self.containerState.initialBlankLine = void 0
      return notInCurrentItem(code)
    }
    self.containerState.furtherBlankLines = void 0
    self.containerState.initialBlankLine = void 0
    return effects.attempt(indentConstruct, ok, notInCurrentItem)(code)
  }
  function notInCurrentItem(code) {
    self.containerState._closeFlow = true
    self.interrupt = void 0
    return factorySpace(
      effects,
      effects.attempt(list, ok, nok),
      "linePrefix",
      self.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4,
    )(code)
  }
}
function tokenizeIndent(effects, ok, nok) {
  const self = this
  return factorySpace(
    effects,
    afterPrefix,
    "listItemIndent",
    self.containerState.size + 1,
  )
  function afterPrefix(code) {
    const tail = self.events[self.events.length - 1]
    return tail &&
      tail[1].type === "listItemIndent" &&
      tail[2].sliceSerialize(tail[1], true).length === self.containerState.size
      ? ok(code)
      : nok(code)
  }
}
function tokenizeListEnd(effects) {
  effects.exit(this.containerState.type)
}
function tokenizeListItemPrefixWhitespace(effects, ok, nok) {
  const self = this
  return factorySpace(
    effects,
    afterPrefix,
    "listItemPrefixWhitespace",
    self.parser.constructs.disable.null.includes("codeIndented")
      ? void 0
      : 4 + 1,
  )
  function afterPrefix(code) {
    const tail = self.events[self.events.length - 1]
    return !markdownSpace(code) &&
      tail &&
      tail[1].type === "listItemPrefixWhitespace"
      ? ok(code)
      : nok(code)
  }
}

// node_modules/micromark-core-commonmark/lib/setext-underline.js
var setextUnderline = {
  name: "setextUnderline",
  tokenize: tokenizeSetextUnderline,
  resolveTo: resolveToSetextUnderline,
}
function resolveToSetextUnderline(events, context) {
  let index2 = events.length
  let content3
  let text3
  let definition2
  while (index2--) {
    if (events[index2][0] === "enter") {
      if (events[index2][1].type === "content") {
        content3 = index2
        break
      }
      if (events[index2][1].type === "paragraph") {
        text3 = index2
      }
    } else {
      if (events[index2][1].type === "content") {
        events.splice(index2, 1)
      }
      if (!definition2 && events[index2][1].type === "definition") {
        definition2 = index2
      }
    }
  }
  const heading = {
    type: "setextHeading",
    start: Object.assign({}, events[text3][1].start),
    end: Object.assign({}, events[events.length - 1][1].end),
  }
  events[text3][1].type = "setextHeadingText"
  if (definition2) {
    events.splice(text3, 0, ["enter", heading, context])
    events.splice(definition2 + 1, 0, ["exit", events[content3][1], context])
    events[content3][1].end = Object.assign({}, events[definition2][1].end)
  } else {
    events[content3][1] = heading
  }
  events.push(["exit", heading, context])
  return events
}
function tokenizeSetextUnderline(effects, ok, nok) {
  const self = this
  let index2 = self.events.length
  let marker
  let paragraph
  while (index2--) {
    if (
      self.events[index2][1].type !== "lineEnding" &&
      self.events[index2][1].type !== "linePrefix" &&
      self.events[index2][1].type !== "content"
    ) {
      paragraph = self.events[index2][1].type === "paragraph"
      break
    }
  }
  return start
  function start(code) {
    if (!self.parser.lazy[self.now().line] && (self.interrupt || paragraph)) {
      effects.enter("setextHeadingLine")
      effects.enter("setextHeadingLineSequence")
      marker = code
      return closingSequence(code)
    }
    return nok(code)
  }
  function closingSequence(code) {
    if (code === marker) {
      effects.consume(code)
      return closingSequence
    }
    effects.exit("setextHeadingLineSequence")
    return factorySpace(effects, closingSequenceEnd, "lineSuffix")(code)
  }
  function closingSequenceEnd(code) {
    if (code === null || markdownLineEnding(code)) {
      effects.exit("setextHeadingLine")
      return ok(code)
    }
    return nok(code)
  }
}

// node_modules/micromark/lib/initialize/flow.js
var flow = {
  tokenize: initializeFlow,
}
function initializeFlow(effects) {
  const self = this
  const initial = effects.attempt(
    blankLine,
    atBlankEnding,
    effects.attempt(
      this.parser.constructs.flowInitial,
      afterConstruct,
      factorySpace(
        effects,
        effects.attempt(
          this.parser.constructs.flow,
          afterConstruct,
          effects.attempt(content2, afterConstruct),
        ),
        "linePrefix",
      ),
    ),
  )
  return initial
  function atBlankEnding(code) {
    if (code === null) {
      effects.consume(code)
      return
    }
    effects.enter("lineEndingBlank")
    effects.consume(code)
    effects.exit("lineEndingBlank")
    self.currentConstruct = void 0
    return initial
  }
  function afterConstruct(code) {
    if (code === null) {
      effects.consume(code)
      return
    }
    effects.enter("lineEnding")
    effects.consume(code)
    effects.exit("lineEnding")
    self.currentConstruct = void 0
    return initial
  }
}

// node_modules/micromark/lib/initialize/text.js
var resolver = {
  resolveAll: createResolver(),
}
var string = initializeFactory("string")
var text = initializeFactory("text")
function initializeFactory(field) {
  return {
    tokenize: initializeText,
    resolveAll: createResolver(
      field === "text" ? resolveAllLineSuffixes : void 0,
    ),
  }
  function initializeText(effects) {
    const self = this
    const constructs2 = this.parser.constructs[field]
    const text3 = effects.attempt(constructs2, start, notText)
    return start
    function start(code) {
      return atBreak(code) ? text3(code) : notText(code)
    }
    function notText(code) {
      if (code === null) {
        effects.consume(code)
        return
      }
      effects.enter("data")
      effects.consume(code)
      return data
    }
    function data(code) {
      if (atBreak(code)) {
        effects.exit("data")
        return text3(code)
      }
      effects.consume(code)
      return data
    }
    function atBreak(code) {
      if (code === null) {
        return true
      }
      const list2 = constructs2[code]
      let index2 = -1
      if (list2) {
        while (++index2 < list2.length) {
          const item = list2[index2]
          if (!item.previous || item.previous.call(self, self.previous)) {
            return true
          }
        }
      }
      return false
    }
  }
}
function createResolver(extraResolver) {
  return resolveAllText
  function resolveAllText(events, context) {
    let index2 = -1
    let enter
    while (++index2 <= events.length) {
      if (enter === void 0) {
        if (events[index2] && events[index2][1].type === "data") {
          enter = index2
          index2++
        }
      } else if (!events[index2] || events[index2][1].type !== "data") {
        if (index2 !== enter + 2) {
          events[enter][1].end = events[index2 - 1][1].end
          events.splice(enter + 2, index2 - enter - 2)
          index2 = enter + 2
        }
        enter = void 0
      }
    }
    return extraResolver ? extraResolver(events, context) : events
  }
}
function resolveAllLineSuffixes(events, context) {
  let eventIndex = -1
  while (++eventIndex <= events.length) {
    if (
      (eventIndex === events.length ||
        events[eventIndex][1].type === "lineEnding") &&
      events[eventIndex - 1][1].type === "data"
    ) {
      const data = events[eventIndex - 1][1]
      const chunks = context.sliceStream(data)
      let index2 = chunks.length
      let bufferIndex = -1
      let size = 0
      let tabs
      while (index2--) {
        const chunk = chunks[index2]
        if (typeof chunk === "string") {
          bufferIndex = chunk.length
          while (chunk.charCodeAt(bufferIndex - 1) === 32) {
            size++
            bufferIndex--
          }
          if (bufferIndex) break
          bufferIndex = -1
        } else if (chunk === -2) {
          tabs = true
          size++
        } else if (chunk === -1) {
        } else {
          index2++
          break
        }
      }
      if (size) {
        const token = {
          type:
            eventIndex === events.length || tabs || size < 2
              ? "lineSuffix"
              : "hardBreakTrailing",
          start: {
            line: data.end.line,
            column: data.end.column - size,
            offset: data.end.offset - size,
            _index: data.start._index + index2,
            _bufferIndex: index2
              ? bufferIndex
              : data.start._bufferIndex + bufferIndex,
          },
          end: Object.assign({}, data.end),
        }
        data.end = Object.assign({}, token.start)
        if (data.start.offset === data.end.offset) {
          Object.assign(data, token)
        } else {
          events.splice(
            eventIndex,
            0,
            ["enter", token, context],
            ["exit", token, context],
          )
          eventIndex += 2
        }
      }
      eventIndex++
    }
  }
  return events
}

// node_modules/micromark/lib/create-tokenizer.js
function createTokenizer(parser, initialize, from) {
  let point2 = Object.assign(
    from
      ? Object.assign({}, from)
      : {
          line: 1,
          column: 1,
          offset: 0,
        },
    {
      _index: 0,
      _bufferIndex: -1,
    },
  )
  const columnStart = {}
  const resolveAllConstructs = []
  let chunks = []
  let stack = []
  let consumed = true
  const effects = {
    consume,
    enter,
    exit: exit2,
    attempt: constructFactory(onsuccessfulconstruct),
    check: constructFactory(onsuccessfulcheck),
    interrupt: constructFactory(onsuccessfulcheck, {
      interrupt: true,
    }),
  }
  const context = {
    previous: null,
    code: null,
    containerState: {},
    events: [],
    parser,
    sliceStream,
    sliceSerialize,
    now,
    defineSkip,
    write,
  }
  let state = initialize.tokenize.call(context, effects)
  let expectedCode
  if (initialize.resolveAll) {
    resolveAllConstructs.push(initialize)
  }
  return context
  function write(slice) {
    chunks = push(chunks, slice)
    main()
    if (chunks[chunks.length - 1] !== null) {
      return []
    }
    addResult(initialize, 0)
    context.events = resolveAll(resolveAllConstructs, context.events, context)
    return context.events
  }
  function sliceSerialize(token, expandTabs) {
    return serializeChunks(sliceStream(token), expandTabs)
  }
  function sliceStream(token) {
    return sliceChunks(chunks, token)
  }
  function now() {
    return Object.assign({}, point2)
  }
  function defineSkip(value2) {
    columnStart[value2.line] = value2.column
    accountForPotentialSkip()
  }
  function main() {
    let chunkIndex
    while (point2._index < chunks.length) {
      const chunk = chunks[point2._index]
      if (typeof chunk === "string") {
        chunkIndex = point2._index
        if (point2._bufferIndex < 0) {
          point2._bufferIndex = 0
        }
        while (
          point2._index === chunkIndex &&
          point2._bufferIndex < chunk.length
        ) {
          go(chunk.charCodeAt(point2._bufferIndex))
        }
      } else {
        go(chunk)
      }
    }
  }
  function go(code) {
    consumed = void 0
    expectedCode = code
    state = state(code)
  }
  function consume(code) {
    if (markdownLineEnding(code)) {
      point2.line++
      point2.column = 1
      point2.offset += code === -3 ? 2 : 1
      accountForPotentialSkip()
    } else if (code !== -1) {
      point2.column++
      point2.offset++
    }
    if (point2._bufferIndex < 0) {
      point2._index++
    } else {
      point2._bufferIndex++
      if (point2._bufferIndex === chunks[point2._index].length) {
        point2._bufferIndex = -1
        point2._index++
      }
    }
    context.previous = code
    consumed = true
  }
  function enter(type, fields) {
    const token = fields || {}
    token.type = type
    token.start = now()
    context.events.push(["enter", token, context])
    stack.push(token)
    return token
  }
  function exit2(type) {
    const token = stack.pop()
    token.end = now()
    context.events.push(["exit", token, context])
    return token
  }
  function onsuccessfulconstruct(construct, info) {
    addResult(construct, info.from)
  }
  function onsuccessfulcheck(_, info) {
    info.restore()
  }
  function constructFactory(onreturn, fields) {
    return hook
    function hook(constructs2, returnState, bogusState) {
      let listOfConstructs
      let constructIndex
      let currentConstruct
      let info
      return Array.isArray(constructs2)
        ? handleListOfConstructs(constructs2)
        : "tokenize" in constructs2
        ? handleListOfConstructs([constructs2])
        : handleMapOfConstructs(constructs2)
      function handleMapOfConstructs(map) {
        return start
        function start(code) {
          const def = code !== null && map[code]
          const all2 = code !== null && map.null
          const list2 = [
            ...(Array.isArray(def) ? def : def ? [def] : []),
            ...(Array.isArray(all2) ? all2 : all2 ? [all2] : []),
          ]
          return handleListOfConstructs(list2)(code)
        }
      }
      function handleListOfConstructs(list2) {
        listOfConstructs = list2
        constructIndex = 0
        if (list2.length === 0) {
          return bogusState
        }
        return handleConstruct(list2[constructIndex])
      }
      function handleConstruct(construct) {
        return start
        function start(code) {
          info = store()
          currentConstruct = construct
          if (!construct.partial) {
            context.currentConstruct = construct
          }
          if (
            construct.name &&
            context.parser.constructs.disable.null.includes(construct.name)
          ) {
            return nok(code)
          }
          return construct.tokenize.call(
            fields ? Object.assign(Object.create(context), fields) : context,
            effects,
            ok,
            nok,
          )(code)
        }
      }
      function ok(code) {
        consumed = true
        onreturn(currentConstruct, info)
        return returnState
      }
      function nok(code) {
        consumed = true
        info.restore()
        if (++constructIndex < listOfConstructs.length) {
          return handleConstruct(listOfConstructs[constructIndex])
        }
        return bogusState
      }
    }
  }
  function addResult(construct, from2) {
    if (construct.resolveAll && !resolveAllConstructs.includes(construct)) {
      resolveAllConstructs.push(construct)
    }
    if (construct.resolve) {
      splice(
        context.events,
        from2,
        context.events.length - from2,
        construct.resolve(context.events.slice(from2), context),
      )
    }
    if (construct.resolveTo) {
      context.events = construct.resolveTo(context.events, context)
    }
  }
  function store() {
    const startPoint = now()
    const startPrevious = context.previous
    const startCurrentConstruct = context.currentConstruct
    const startEventsIndex = context.events.length
    const startStack = Array.from(stack)
    return {
      restore,
      from: startEventsIndex,
    }
    function restore() {
      point2 = startPoint
      context.previous = startPrevious
      context.currentConstruct = startCurrentConstruct
      context.events.length = startEventsIndex
      stack = startStack
      accountForPotentialSkip()
    }
  }
  function accountForPotentialSkip() {
    if (point2.line in columnStart && point2.column < 2) {
      point2.column = columnStart[point2.line]
      point2.offset += columnStart[point2.line] - 1
    }
  }
}
function sliceChunks(chunks, token) {
  const startIndex = token.start._index
  const startBufferIndex = token.start._bufferIndex
  const endIndex = token.end._index
  const endBufferIndex = token.end._bufferIndex
  let view
  if (startIndex === endIndex) {
    view = [chunks[startIndex].slice(startBufferIndex, endBufferIndex)]
  } else {
    view = chunks.slice(startIndex, endIndex)
    if (startBufferIndex > -1) {
      view[0] = view[0].slice(startBufferIndex)
    }
    if (endBufferIndex > 0) {
      view.push(chunks[endIndex].slice(0, endBufferIndex))
    }
  }
  return view
}
function serializeChunks(chunks, expandTabs) {
  let index2 = -1
  const result = []
  let atTab
  while (++index2 < chunks.length) {
    const chunk = chunks[index2]
    let value2
    if (typeof chunk === "string") {
      value2 = chunk
    } else
      switch (chunk) {
        case -5: {
          value2 = "\r"
          break
        }
        case -4: {
          value2 = "\n"
          break
        }
        case -3: {
          value2 = "\r\n"
          break
        }
        case -2: {
          value2 = expandTabs ? " " : "	"
          break
        }
        case -1: {
          if (!expandTabs && atTab) continue
          value2 = " "
          break
        }
        default: {
          value2 = String.fromCharCode(chunk)
        }
      }
    atTab = chunk === -2
    result.push(value2)
  }
  return result.join("")
}

// node_modules/micromark/lib/constructs.js
var constructs_exports = {}
__export(constructs_exports, {
  attentionMarkers: () => attentionMarkers,
  contentInitial: () => contentInitial,
  disable: () => disable,
  document: () => document3,
  flow: () => flow2,
  flowInitial: () => flowInitial,
  insideSpan: () => insideSpan,
  string: () => string2,
  text: () => text2,
})
var document3 = {
  [42]: list,
  [43]: list,
  [45]: list,
  [48]: list,
  [49]: list,
  [50]: list,
  [51]: list,
  [52]: list,
  [53]: list,
  [54]: list,
  [55]: list,
  [56]: list,
  [57]: list,
  [62]: blockQuote,
}
var contentInitial = {
  [91]: definition,
}
var flowInitial = {
  [-2]: codeIndented,
  [-1]: codeIndented,
  [32]: codeIndented,
}
var flow2 = {
  [35]: headingAtx,
  [42]: thematicBreak,
  [45]: [setextUnderline, thematicBreak],
  [60]: htmlFlow,
  [61]: setextUnderline,
  [95]: thematicBreak,
  [96]: codeFenced,
  [126]: codeFenced,
}
var string2 = {
  [38]: characterReference,
  [92]: characterEscape,
}
var text2 = {
  [-5]: lineEnding,
  [-4]: lineEnding,
  [-3]: lineEnding,
  [33]: labelStartImage,
  [38]: characterReference,
  [42]: attention,
  [60]: [autolink, htmlText],
  [91]: labelStartLink,
  [92]: [hardBreakEscape, characterEscape],
  [93]: labelEnd,
  [95]: attention,
  [96]: codeText,
}
var insideSpan = {
  null: [attention, resolver],
}
var attentionMarkers = {
  null: [42, 95],
}
var disable = {
  null: [],
}

// node_modules/micromark/lib/parse.js
function parse2(options = {}) {
  const constructs2 = combineExtensions(
    [constructs_exports].concat(options.extensions || []),
  )
  const parser = {
    defined: [],
    lazy: {},
    constructs: constructs2,
    content: create2(content),
    document: create2(document2),
    flow: create2(flow),
    string: create2(string),
    text: create2(text),
  }
  return parser
  function create2(initial) {
    return creator
    function creator(from) {
      return createTokenizer(parser, initial, from)
    }
  }
}

// node_modules/micromark/lib/preprocess.js
var search = /[\0\t\n\r]/g
function preprocess() {
  let column = 1
  let buffer2 = ""
  let start = true
  let atCarriageReturn
  return preprocessor
  function preprocessor(value2, encoding, end) {
    const chunks = []
    let match
    let next
    let startPosition
    let endPosition
    let code
    value2 = buffer2 + value2.toString(encoding)
    startPosition = 0
    buffer2 = ""
    if (start) {
      if (value2.charCodeAt(0) === 65279) {
        startPosition++
      }
      start = void 0
    }
    while (startPosition < value2.length) {
      search.lastIndex = startPosition
      match = search.exec(value2)
      endPosition =
        match && match.index !== void 0 ? match.index : value2.length
      code = value2.charCodeAt(endPosition)
      if (!match) {
        buffer2 = value2.slice(startPosition)
        break
      }
      if (code === 10 && startPosition === endPosition && atCarriageReturn) {
        chunks.push(-3)
        atCarriageReturn = void 0
      } else {
        if (atCarriageReturn) {
          chunks.push(-5)
          atCarriageReturn = void 0
        }
        if (startPosition < endPosition) {
          chunks.push(value2.slice(startPosition, endPosition))
          column += endPosition - startPosition
        }
        switch (code) {
          case 0: {
            chunks.push(65533)
            column++
            break
          }
          case 9: {
            next = Math.ceil(column / 4) * 4
            chunks.push(-2)
            while (column++ < next) chunks.push(-1)
            break
          }
          case 10: {
            chunks.push(-4)
            column = 1
            break
          }
          default: {
            atCarriageReturn = true
            column = 1
          }
        }
      }
      startPosition = endPosition + 1
    }
    if (end) {
      if (atCarriageReturn) chunks.push(-5)
      if (buffer2) chunks.push(buffer2)
      chunks.push(null)
    }
    return chunks
  }
}

// node_modules/micromark/lib/postprocess.js
function postprocess(events) {
  while (!subtokenize(events)) {}
  return events
}

// node_modules/micromark-util-decode-numeric-character-reference/index.js
function decodeNumericCharacterReference(value2, base2) {
  const code = Number.parseInt(value2, base2)
  if (
    code < 9 ||
    code === 11 ||
    (code > 13 && code < 32) ||
    (code > 126 && code < 160) ||
    (code > 55295 && code < 57344) ||
    (code > 64975 && code < 65008) ||
    (code & 65535) === 65535 ||
    (code & 65535) === 65534 ||
    code > 1114111
  ) {
    return "\uFFFD"
  }
  return String.fromCharCode(code)
}

// node_modules/micromark-util-decode-string/index.js
var characterEscapeOrReference =
  /\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi
function decodeString(value2) {
  return value2.replace(characterEscapeOrReference, decode)
}
function decode($0, $1, $2) {
  if ($1) {
    return $1
  }
  const head = $2.charCodeAt(0)
  if (head === 35) {
    const head2 = $2.charCodeAt(1)
    const hex = head2 === 120 || head2 === 88
    return decodeNumericCharacterReference($2.slice(hex ? 2 : 1), hex ? 16 : 10)
  }
  return decodeEntity($2) || $0
}

// node_modules/unist-util-stringify-position/index.js
var own2 = {}.hasOwnProperty
function stringifyPosition(value2) {
  if (!value2 || typeof value2 !== "object") {
    return ""
  }
  if (own2.call(value2, "position") || own2.call(value2, "type")) {
    return position(value2.position)
  }
  if (own2.call(value2, "start") || own2.call(value2, "end")) {
    return position(value2)
  }
  if (own2.call(value2, "line") || own2.call(value2, "column")) {
    return point(value2)
  }
  return ""
}
function point(point2) {
  return index(point2 && point2.line) + ":" + index(point2 && point2.column)
}
function position(pos) {
  return point(pos && pos.start) + "-" + point(pos && pos.end)
}
function index(value2) {
  return value2 && typeof value2 === "number" ? value2 : 1
}

// node_modules/mdast-util-from-markdown/lib/index.js
var own3 = {}.hasOwnProperty
var fromMarkdown = function (value2, encoding, options) {
  if (typeof encoding !== "string") {
    options = encoding
    encoding = void 0
  }
  return compiler(options)(
    postprocess(
      parse2(options).document().write(preprocess()(value2, encoding, true)),
    ),
  )
}
function compiler(options = {}) {
  const config = configure(
    {
      transforms: [],
      canContainEols: [
        "emphasis",
        "fragment",
        "heading",
        "paragraph",
        "strong",
      ],
      enter: {
        autolink: opener2(link),
        autolinkProtocol: onenterdata,
        autolinkEmail: onenterdata,
        atxHeading: opener2(heading),
        blockQuote: opener2(blockQuote2),
        characterEscape: onenterdata,
        characterReference: onenterdata,
        codeFenced: opener2(codeFlow),
        codeFencedFenceInfo: buffer2,
        codeFencedFenceMeta: buffer2,
        codeIndented: opener2(codeFlow, buffer2),
        codeText: opener2(codeText2, buffer2),
        codeTextData: onenterdata,
        data: onenterdata,
        codeFlowValue: onenterdata,
        definition: opener2(definition2),
        definitionDestinationString: buffer2,
        definitionLabelString: buffer2,
        definitionTitleString: buffer2,
        emphasis: opener2(emphasis),
        hardBreakEscape: opener2(hardBreak),
        hardBreakTrailing: opener2(hardBreak),
        htmlFlow: opener2(html, buffer2),
        htmlFlowData: onenterdata,
        htmlText: opener2(html, buffer2),
        htmlTextData: onenterdata,
        image: opener2(image),
        label: buffer2,
        link: opener2(link),
        listItem: opener2(listItem),
        listItemValue: onenterlistitemvalue,
        listOrdered: opener2(list2, onenterlistordered),
        listUnordered: opener2(list2),
        paragraph: opener2(paragraph),
        reference: onenterreference,
        referenceString: buffer2,
        resourceDestinationString: buffer2,
        resourceTitleString: buffer2,
        setextHeading: opener2(heading),
        strong: opener2(strong),
        thematicBreak: opener2(thematicBreak2),
      },
      exit: {
        atxHeading: closer(),
        atxHeadingSequence: onexitatxheadingsequence,
        autolink: closer(),
        autolinkEmail: onexitautolinkemail,
        autolinkProtocol: onexitautolinkprotocol,
        blockQuote: closer(),
        characterEscapeValue: onexitdata,
        characterReferenceMarkerHexadecimal: onexitcharacterreferencemarker,
        characterReferenceMarkerNumeric: onexitcharacterreferencemarker,
        characterReferenceValue: onexitcharacterreferencevalue,
        codeFenced: closer(onexitcodefenced),
        codeFencedFence: onexitcodefencedfence,
        codeFencedFenceInfo: onexitcodefencedfenceinfo,
        codeFencedFenceMeta: onexitcodefencedfencemeta,
        codeFlowValue: onexitdata,
        codeIndented: closer(onexitcodeindented),
        codeText: closer(onexitcodetext),
        codeTextData: onexitdata,
        data: onexitdata,
        definition: closer(),
        definitionDestinationString: onexitdefinitiondestinationstring,
        definitionLabelString: onexitdefinitionlabelstring,
        definitionTitleString: onexitdefinitiontitlestring,
        emphasis: closer(),
        hardBreakEscape: closer(onexithardbreak),
        hardBreakTrailing: closer(onexithardbreak),
        htmlFlow: closer(onexithtmlflow),
        htmlFlowData: onexitdata,
        htmlText: closer(onexithtmltext),
        htmlTextData: onexitdata,
        image: closer(onexitimage),
        label: onexitlabel,
        labelText: onexitlabeltext,
        lineEnding: onexitlineending,
        link: closer(onexitlink),
        listItem: closer(),
        listOrdered: closer(),
        listUnordered: closer(),
        paragraph: closer(),
        referenceString: onexitreferencestring,
        resourceDestinationString: onexitresourcedestinationstring,
        resourceTitleString: onexitresourcetitlestring,
        resource: onexitresource,
        setextHeading: closer(onexitsetextheading),
        setextHeadingLineSequence: onexitsetextheadinglinesequence,
        setextHeadingText: onexitsetextheadingtext,
        strong: closer(),
        thematicBreak: closer(),
      },
    },
    options.mdastExtensions || [],
  )
  const data = {}
  return compile
  function compile(events) {
    let tree = {
      type: "root",
      children: [],
    }
    const stack = [tree]
    const tokenStack = []
    const listStack = []
    const context = {
      stack,
      tokenStack,
      config,
      enter,
      exit: exit2,
      buffer: buffer2,
      resume,
      setData,
      getData,
    }
    let index2 = -1
    while (++index2 < events.length) {
      if (
        events[index2][1].type === "listOrdered" ||
        events[index2][1].type === "listUnordered"
      ) {
        if (events[index2][0] === "enter") {
          listStack.push(index2)
        } else {
          const tail = listStack.pop()
          index2 = prepareList(events, tail, index2)
        }
      }
    }
    index2 = -1
    while (++index2 < events.length) {
      const handler2 = config[events[index2][0]]
      if (own3.call(handler2, events[index2][1].type)) {
        handler2[events[index2][1].type].call(
          Object.assign(
            {
              sliceSerialize: events[index2][2].sliceSerialize,
            },
            context,
          ),
          events[index2][1],
        )
      }
    }
    if (tokenStack.length > 0) {
      throw new Error(
        "Cannot close document, a token (`" +
          tokenStack[tokenStack.length - 1].type +
          "`, " +
          stringifyPosition({
            start: tokenStack[tokenStack.length - 1].start,
            end: tokenStack[tokenStack.length - 1].end,
          }) +
          ") is still open",
      )
    }
    tree.position = {
      start: point2(
        events.length > 0
          ? events[0][1].start
          : {
              line: 1,
              column: 1,
              offset: 0,
            },
      ),
      end: point2(
        events.length > 0
          ? events[events.length - 2][1].end
          : {
              line: 1,
              column: 1,
              offset: 0,
            },
      ),
    }
    index2 = -1
    while (++index2 < config.transforms.length) {
      tree = config.transforms[index2](tree) || tree
    }
    return tree
  }
  function prepareList(events, start, length) {
    let index2 = start - 1
    let containerBalance = -1
    let listSpread = false
    let listItem2
    let lineIndex
    let firstBlankLineIndex
    let atMarker
    while (++index2 <= length) {
      const event = events[index2]
      if (
        event[1].type === "listUnordered" ||
        event[1].type === "listOrdered" ||
        event[1].type === "blockQuote"
      ) {
        if (event[0] === "enter") {
          containerBalance++
        } else {
          containerBalance--
        }
        atMarker = void 0
      } else if (event[1].type === "lineEndingBlank") {
        if (event[0] === "enter") {
          if (
            listItem2 &&
            !atMarker &&
            !containerBalance &&
            !firstBlankLineIndex
          ) {
            firstBlankLineIndex = index2
          }
          atMarker = void 0
        }
      } else if (
        event[1].type === "linePrefix" ||
        event[1].type === "listItemValue" ||
        event[1].type === "listItemMarker" ||
        event[1].type === "listItemPrefix" ||
        event[1].type === "listItemPrefixWhitespace"
      ) {
      } else {
        atMarker = void 0
      }
      if (
        (!containerBalance &&
          event[0] === "enter" &&
          event[1].type === "listItemPrefix") ||
        (containerBalance === -1 &&
          event[0] === "exit" &&
          (event[1].type === "listUnordered" ||
            event[1].type === "listOrdered"))
      ) {
        if (listItem2) {
          let tailIndex = index2
          lineIndex = void 0
          while (tailIndex--) {
            const tailEvent = events[tailIndex]
            if (
              tailEvent[1].type === "lineEnding" ||
              tailEvent[1].type === "lineEndingBlank"
            ) {
              if (tailEvent[0] === "exit") continue
              if (lineIndex) {
                events[lineIndex][1].type = "lineEndingBlank"
                listSpread = true
              }
              tailEvent[1].type = "lineEnding"
              lineIndex = tailIndex
            } else if (
              tailEvent[1].type === "linePrefix" ||
              tailEvent[1].type === "blockQuotePrefix" ||
              tailEvent[1].type === "blockQuotePrefixWhitespace" ||
              tailEvent[1].type === "blockQuoteMarker" ||
              tailEvent[1].type === "listItemIndent"
            ) {
            } else {
              break
            }
          }
          if (
            firstBlankLineIndex &&
            (!lineIndex || firstBlankLineIndex < lineIndex)
          ) {
            listItem2._spread = true
          }
          listItem2.end = Object.assign(
            {},
            lineIndex ? events[lineIndex][1].start : event[1].end,
          )
          events.splice(lineIndex || index2, 0, ["exit", listItem2, event[2]])
          index2++
          length++
        }
        if (event[1].type === "listItemPrefix") {
          listItem2 = {
            type: "listItem",
            _spread: false,
            start: Object.assign({}, event[1].start),
          }
          events.splice(index2, 0, ["enter", listItem2, event[2]])
          index2++
          length++
          firstBlankLineIndex = void 0
          atMarker = true
        }
      }
    }
    events[start][1]._spread = listSpread
    return length
  }
  function setData(key, value2) {
    data[key] = value2
  }
  function getData(key) {
    return data[key]
  }
  function point2(d) {
    return {
      line: d.line,
      column: d.column,
      offset: d.offset,
    }
  }
  function opener2(create2, and) {
    return open
    function open(token) {
      enter.call(this, create2(token), token)
      if (and) and.call(this, token)
    }
  }
  function buffer2() {
    this.stack.push({
      type: "fragment",
      children: [],
    })
  }
  function enter(node, token) {
    const parent = this.stack[this.stack.length - 1]
    parent.children.push(node)
    this.stack.push(node)
    this.tokenStack.push(token)
    node.position = {
      start: point2(token.start),
    }
    return node
  }
  function closer(and) {
    return close2
    function close2(token) {
      if (and) and.call(this, token)
      exit2.call(this, token)
    }
  }
  function exit2(token) {
    const node = this.stack.pop()
    const open = this.tokenStack.pop()
    if (!open) {
      throw new Error(
        "Cannot close `" +
          token.type +
          "` (" +
          stringifyPosition({
            start: token.start,
            end: token.end,
          }) +
          "): it\u2019s not open",
      )
    } else if (open.type !== token.type) {
      throw new Error(
        "Cannot close `" +
          token.type +
          "` (" +
          stringifyPosition({
            start: token.start,
            end: token.end,
          }) +
          "): a different token (`" +
          open.type +
          "`, " +
          stringifyPosition({
            start: open.start,
            end: open.end,
          }) +
          ") is open",
      )
    }
    node.position.end = point2(token.end)
    return node
  }
  function resume() {
    return toString(this.stack.pop())
  }
  function onenterlistordered() {
    setData("expectingFirstListItemValue", true)
  }
  function onenterlistitemvalue(token) {
    if (getData("expectingFirstListItemValue")) {
      const ancestor = this.stack[this.stack.length - 2]
      ancestor.start = Number.parseInt(this.sliceSerialize(token), 10)
      setData("expectingFirstListItemValue")
    }
  }
  function onexitcodefencedfenceinfo() {
    const data2 = this.resume()
    const node = this.stack[this.stack.length - 1]
    node.lang = data2
  }
  function onexitcodefencedfencemeta() {
    const data2 = this.resume()
    const node = this.stack[this.stack.length - 1]
    node.meta = data2
  }
  function onexitcodefencedfence() {
    if (getData("flowCodeInside")) return
    this.buffer()
    setData("flowCodeInside", true)
  }
  function onexitcodefenced() {
    const data2 = this.resume()
    const node = this.stack[this.stack.length - 1]
    node.value = data2.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, "")
    setData("flowCodeInside")
  }
  function onexitcodeindented() {
    const data2 = this.resume()
    const node = this.stack[this.stack.length - 1]
    node.value = data2.replace(/(\r?\n|\r)$/g, "")
  }
  function onexitdefinitionlabelstring(token) {
    const label = this.resume()
    const node = this.stack[this.stack.length - 1]
    node.label = label
    node.identifier = normalizeIdentifier(
      this.sliceSerialize(token),
    ).toLowerCase()
  }
  function onexitdefinitiontitlestring() {
    const data2 = this.resume()
    const node = this.stack[this.stack.length - 1]
    node.title = data2
  }
  function onexitdefinitiondestinationstring() {
    const data2 = this.resume()
    const node = this.stack[this.stack.length - 1]
    node.url = data2
  }
  function onexitatxheadingsequence(token) {
    const node = this.stack[this.stack.length - 1]
    if (!node.depth) {
      const depth = this.sliceSerialize(token).length
      node.depth = depth
    }
  }
  function onexitsetextheadingtext() {
    setData("setextHeadingSlurpLineEnding", true)
  }
  function onexitsetextheadinglinesequence(token) {
    const node = this.stack[this.stack.length - 1]
    node.depth = this.sliceSerialize(token).charCodeAt(0) === 61 ? 1 : 2
  }
  function onexitsetextheading() {
    setData("setextHeadingSlurpLineEnding")
  }
  function onenterdata(token) {
    const parent = this.stack[this.stack.length - 1]
    let tail = parent.children[parent.children.length - 1]
    if (!tail || tail.type !== "text") {
      tail = text3()
      tail.position = {
        start: point2(token.start),
      }
      parent.children.push(tail)
    }
    this.stack.push(tail)
  }
  function onexitdata(token) {
    const tail = this.stack.pop()
    tail.value += this.sliceSerialize(token)
    tail.position.end = point2(token.end)
  }
  function onexitlineending(token) {
    const context = this.stack[this.stack.length - 1]
    if (getData("atHardBreak")) {
      const tail = context.children[context.children.length - 1]
      tail.position.end = point2(token.end)
      setData("atHardBreak")
      return
    }
    if (
      !getData("setextHeadingSlurpLineEnding") &&
      config.canContainEols.includes(context.type)
    ) {
      onenterdata.call(this, token)
      onexitdata.call(this, token)
    }
  }
  function onexithardbreak() {
    setData("atHardBreak", true)
  }
  function onexithtmlflow() {
    const data2 = this.resume()
    const node = this.stack[this.stack.length - 1]
    node.value = data2
  }
  function onexithtmltext() {
    const data2 = this.resume()
    const node = this.stack[this.stack.length - 1]
    node.value = data2
  }
  function onexitcodetext() {
    const data2 = this.resume()
    const node = this.stack[this.stack.length - 1]
    node.value = data2
  }
  function onexitlink() {
    const context = this.stack[this.stack.length - 1]
    if (getData("inReference")) {
      context.type += "Reference"
      context.referenceType = getData("referenceType") || "shortcut"
      delete context.url
      delete context.title
    } else {
      delete context.identifier
      delete context.label
    }
    setData("referenceType")
  }
  function onexitimage() {
    const context = this.stack[this.stack.length - 1]
    if (getData("inReference")) {
      context.type += "Reference"
      context.referenceType = getData("referenceType") || "shortcut"
      delete context.url
      delete context.title
    } else {
      delete context.identifier
      delete context.label
    }
    setData("referenceType")
  }
  function onexitlabeltext(token) {
    const ancestor = this.stack[this.stack.length - 2]
    const string3 = this.sliceSerialize(token)
    ancestor.label = decodeString(string3)
    ancestor.identifier = normalizeIdentifier(string3).toLowerCase()
  }
  function onexitlabel() {
    const fragment = this.stack[this.stack.length - 1]
    const value2 = this.resume()
    const node = this.stack[this.stack.length - 1]
    setData("inReference", true)
    if (node.type === "link") {
      node.children = fragment.children
    } else {
      node.alt = value2
    }
  }
  function onexitresourcedestinationstring() {
    const data2 = this.resume()
    const node = this.stack[this.stack.length - 1]
    node.url = data2
  }
  function onexitresourcetitlestring() {
    const data2 = this.resume()
    const node = this.stack[this.stack.length - 1]
    node.title = data2
  }
  function onexitresource() {
    setData("inReference")
  }
  function onenterreference() {
    setData("referenceType", "collapsed")
  }
  function onexitreferencestring(token) {
    const label = this.resume()
    const node = this.stack[this.stack.length - 1]
    node.label = label
    node.identifier = normalizeIdentifier(
      this.sliceSerialize(token),
    ).toLowerCase()
    setData("referenceType", "full")
  }
  function onexitcharacterreferencemarker(token) {
    setData("characterReferenceType", token.type)
  }
  function onexitcharacterreferencevalue(token) {
    const data2 = this.sliceSerialize(token)
    const type = getData("characterReferenceType")
    let value2
    if (type) {
      value2 = decodeNumericCharacterReference(
        data2,
        type === "characterReferenceMarkerNumeric" ? 10 : 16,
      )
      setData("characterReferenceType")
    } else {
      value2 = decodeEntity(data2)
    }
    const tail = this.stack.pop()
    tail.value += value2
    tail.position.end = point2(token.end)
  }
  function onexitautolinkprotocol(token) {
    onexitdata.call(this, token)
    const node = this.stack[this.stack.length - 1]
    node.url = this.sliceSerialize(token)
  }
  function onexitautolinkemail(token) {
    onexitdata.call(this, token)
    const node = this.stack[this.stack.length - 1]
    node.url = "mailto:" + this.sliceSerialize(token)
  }
  function blockQuote2() {
    return {
      type: "blockquote",
      children: [],
    }
  }
  function codeFlow() {
    return {
      type: "code",
      lang: null,
      meta: null,
      value: "",
    }
  }
  function codeText2() {
    return {
      type: "inlineCode",
      value: "",
    }
  }
  function definition2() {
    return {
      type: "definition",
      identifier: "",
      label: null,
      title: null,
      url: "",
    }
  }
  function emphasis() {
    return {
      type: "emphasis",
      children: [],
    }
  }
  function heading() {
    return {
      type: "heading",
      depth: void 0,
      children: [],
    }
  }
  function hardBreak() {
    return {
      type: "break",
    }
  }
  function html() {
    return {
      type: "html",
      value: "",
    }
  }
  function image() {
    return {
      type: "image",
      title: null,
      url: "",
      alt: null,
    }
  }
  function link() {
    return {
      type: "link",
      title: null,
      url: "",
      children: [],
    }
  }
  function list2(token) {
    return {
      type: "list",
      ordered: token.type === "listOrdered",
      start: null,
      spread: token._spread,
      children: [],
    }
  }
  function listItem(token) {
    return {
      type: "listItem",
      spread: token._spread,
      checked: null,
      children: [],
    }
  }
  function paragraph() {
    return {
      type: "paragraph",
      children: [],
    }
  }
  function strong() {
    return {
      type: "strong",
      children: [],
    }
  }
  function text3() {
    return {
      type: "text",
      value: "",
    }
  }
  function thematicBreak2() {
    return {
      type: "thematicBreak",
    }
  }
}
function configure(combined, extensions) {
  let index2 = -1
  while (++index2 < extensions.length) {
    const value2 = extensions[index2]
    if (Array.isArray(value2)) {
      configure(combined, value2)
    } else {
      extension(combined, value2)
    }
  }
  return combined
}
function extension(combined, extension2) {
  let key
  for (key in extension2) {
    if (own3.call(extension2, key)) {
      const list2 = key === "canContainEols" || key === "transforms"
      const maybe = own3.call(combined, key) ? combined[key] : void 0
      const left = maybe || (combined[key] = list2 ? [] : {})
      const right = extension2[key]
      if (right) {
        if (list2) {
          combined[key] = [...left, ...right]
        } else {
          Object.assign(left, right)
        }
      }
    }
  }
}

// node_modules/remark-parse/lib/index.js
function remarkParse(options) {
  const parser = (doc) => {
    const settings = this.data("settings")
    return fromMarkdown(
      doc,
      Object.assign({}, settings, options, {
        extensions: this.data("micromarkExtensions") || [],
        mdastExtensions: this.data("fromMarkdownExtensions") || [],
      }),
    )
  }
  Object.assign(this, { Parser: parser })
}

// node_modules/remark-parse/index.js
var remark_parse_default = remarkParse

// node_modules/bail/index.js
function bail(error) {
  if (error) {
    throw error
  }
}

// node_modules/unified/lib/index.js
var import_is_buffer2 = __toModule(require_is_buffer())
var import_extend = __toModule(require_extend())

// node_modules/is-plain-obj/index.js
function isPlainObject(value2) {
  if (Object.prototype.toString.call(value2) !== "[object Object]") {
    return false
  }
  const prototype = Object.getPrototypeOf(value2)
  return prototype === null || prototype === Object.prototype
}

// node_modules/trough/index.js
function trough() {
  const fns = []
  const pipeline = { run, use }
  return pipeline
  function run(...values) {
    let middlewareIndex = -1
    const callback = values.pop()
    if (typeof callback !== "function") {
      throw new TypeError("Expected function as last argument, not " + callback)
    }
    next(null, ...values)
    function next(error, ...output) {
      const fn = fns[++middlewareIndex]
      let index2 = -1
      if (error) {
        callback(error)
        return
      }
      while (++index2 < values.length) {
        if (output[index2] === null || output[index2] === void 0) {
          output[index2] = values[index2]
        }
      }
      values = output
      if (fn) {
        wrap(fn, next)(...output)
      } else {
        callback(null, ...output)
      }
    }
  }
  function use(middelware) {
    if (typeof middelware !== "function") {
      throw new TypeError(
        "Expected `middelware` to be a function, not " + middelware,
      )
    }
    fns.push(middelware)
    return pipeline
  }
}
function wrap(middleware, callback) {
  let called
  return wrapped
  function wrapped(...parameters) {
    const fnExpectsCallback = middleware.length > parameters.length
    let result
    if (fnExpectsCallback) {
      parameters.push(done)
    }
    try {
      result = middleware(...parameters)
    } catch (error) {
      const exception = error
      if (fnExpectsCallback && called) {
        throw exception
      }
      return done(exception)
    }
    if (!fnExpectsCallback) {
      if (result instanceof Promise) {
        result.then(then, done)
      } else if (result instanceof Error) {
        done(result)
      } else {
        then(result)
      }
    }
  }
  function done(error, ...output) {
    if (!called) {
      called = true
      callback(error, ...output)
    }
  }
  function then(value2) {
    done(null, value2)
  }
}

// node_modules/vfile/lib/index.js
var import_is_buffer = __toModule(require_is_buffer())

// node_modules/vfile-message/index.js
var VFileMessage = class extends Error {
  constructor(reason, place, origin) {
    var parts = [null, null]
    var position2 = {
      start: { line: null, column: null },
      end: { line: null, column: null },
    }
    var index2
    super()
    if (typeof place === "string") {
      origin = place
      place = null
    }
    if (typeof origin === "string") {
      index2 = origin.indexOf(":")
      if (index2 === -1) {
        parts[1] = origin
      } else {
        parts[0] = origin.slice(0, index2)
        parts[1] = origin.slice(index2 + 1)
      }
    }
    if (place) {
      if ("type" in place || "position" in place) {
        if (place.position) {
          position2 = place.position
        }
      } else if ("start" in place || "end" in place) {
        position2 = place
      } else if ("line" in place || "column" in place) {
        position2.start = place
      }
    }
    this.name = stringifyPosition(place) || "1:1"
    this.message = typeof reason === "object" ? reason.message : reason
    this.stack = typeof reason === "object" ? reason.stack : ""
    this.reason = this.message
    this.line = position2.start.line
    this.column = position2.start.column
    this.source = parts[0]
    this.ruleId = parts[1]
    this.position = position2
    this.file
    this.fatal
    this.url
    this.note
  }
}
VFileMessage.prototype.file = ""
VFileMessage.prototype.name = ""
VFileMessage.prototype.reason = ""
VFileMessage.prototype.message = ""
VFileMessage.prototype.stack = ""
VFileMessage.prototype.fatal = null
VFileMessage.prototype.column = null
VFileMessage.prototype.line = null
VFileMessage.prototype.source = null
VFileMessage.prototype.ruleId = null
VFileMessage.prototype.position = null

// node_modules/vfile/lib/minpath.browser.js
var path = { basename, dirname, extname, join, sep: "/" }
function basename(path2, ext) {
  if (ext !== void 0 && typeof ext !== "string") {
    throw new TypeError('"ext" argument must be a string')
  }
  assertPath(path2)
  let start = 0
  let end = -1
  let index2 = path2.length
  let seenNonSlash
  if (ext === void 0 || ext.length === 0 || ext.length > path2.length) {
    while (index2--) {
      if (path2.charCodeAt(index2) === 47) {
        if (seenNonSlash) {
          start = index2 + 1
          break
        }
      } else if (end < 0) {
        seenNonSlash = true
        end = index2 + 1
      }
    }
    return end < 0 ? "" : path2.slice(start, end)
  }
  if (ext === path2) {
    return ""
  }
  let firstNonSlashEnd = -1
  let extIndex = ext.length - 1
  while (index2--) {
    if (path2.charCodeAt(index2) === 47) {
      if (seenNonSlash) {
        start = index2 + 1
        break
      }
    } else {
      if (firstNonSlashEnd < 0) {
        seenNonSlash = true
        firstNonSlashEnd = index2 + 1
      }
      if (extIndex > -1) {
        if (path2.charCodeAt(index2) === ext.charCodeAt(extIndex--)) {
          if (extIndex < 0) {
            end = index2
          }
        } else {
          extIndex = -1
          end = firstNonSlashEnd
        }
      }
    }
  }
  if (start === end) {
    end = firstNonSlashEnd
  } else if (end < 0) {
    end = path2.length
  }
  return path2.slice(start, end)
}
function dirname(path2) {
  assertPath(path2)
  if (path2.length === 0) {
    return "."
  }
  let end = -1
  let index2 = path2.length
  let unmatchedSlash
  while (--index2) {
    if (path2.charCodeAt(index2) === 47) {
      if (unmatchedSlash) {
        end = index2
        break
      }
    } else if (!unmatchedSlash) {
      unmatchedSlash = true
    }
  }
  return end < 0
    ? path2.charCodeAt(0) === 47
      ? "/"
      : "."
    : end === 1 && path2.charCodeAt(0) === 47
    ? "//"
    : path2.slice(0, end)
}
function extname(path2) {
  assertPath(path2)
  let index2 = path2.length
  let end = -1
  let startPart = 0
  let startDot = -1
  let preDotState = 0
  let unmatchedSlash
  while (index2--) {
    const code = path2.charCodeAt(index2)
    if (code === 47) {
      if (unmatchedSlash) {
        startPart = index2 + 1
        break
      }
      continue
    }
    if (end < 0) {
      unmatchedSlash = true
      end = index2 + 1
    }
    if (code === 46) {
      if (startDot < 0) {
        startDot = index2
      } else if (preDotState !== 1) {
        preDotState = 1
      }
    } else if (startDot > -1) {
      preDotState = -1
    }
  }
  if (
    startDot < 0 ||
    end < 0 ||
    preDotState === 0 ||
    (preDotState === 1 && startDot === end - 1 && startDot === startPart + 1)
  ) {
    return ""
  }
  return path2.slice(startDot, end)
}
function join(...segments) {
  let index2 = -1
  let joined
  while (++index2 < segments.length) {
    assertPath(segments[index2])
    if (segments[index2]) {
      joined =
        joined === void 0 ? segments[index2] : joined + "/" + segments[index2]
    }
  }
  return joined === void 0 ? "." : normalize(joined)
}
function normalize(path2) {
  assertPath(path2)
  const absolute = path2.charCodeAt(0) === 47
  let value2 = normalizeString(path2, !absolute)
  if (value2.length === 0 && !absolute) {
    value2 = "."
  }
  if (value2.length > 0 && path2.charCodeAt(path2.length - 1) === 47) {
    value2 += "/"
  }
  return absolute ? "/" + value2 : value2
}
function normalizeString(path2, allowAboveRoot) {
  let result = ""
  let lastSegmentLength = 0
  let lastSlash = -1
  let dots = 0
  let index2 = -1
  let code
  let lastSlashIndex
  while (++index2 <= path2.length) {
    if (index2 < path2.length) {
      code = path2.charCodeAt(index2)
    } else if (code === 47) {
      break
    } else {
      code = 47
    }
    if (code === 47) {
      if (lastSlash === index2 - 1 || dots === 1) {
      } else if (lastSlash !== index2 - 1 && dots === 2) {
        if (
          result.length < 2 ||
          lastSegmentLength !== 2 ||
          result.charCodeAt(result.length - 1) !== 46 ||
          result.charCodeAt(result.length - 2) !== 46
        ) {
          if (result.length > 2) {
            lastSlashIndex = result.lastIndexOf("/")
            if (lastSlashIndex !== result.length - 1) {
              if (lastSlashIndex < 0) {
                result = ""
                lastSegmentLength = 0
              } else {
                result = result.slice(0, lastSlashIndex)
                lastSegmentLength = result.length - 1 - result.lastIndexOf("/")
              }
              lastSlash = index2
              dots = 0
              continue
            }
          } else if (result.length > 0) {
            result = ""
            lastSegmentLength = 0
            lastSlash = index2
            dots = 0
            continue
          }
        }
        if (allowAboveRoot) {
          result = result.length > 0 ? result + "/.." : ".."
          lastSegmentLength = 2
        }
      } else {
        if (result.length > 0) {
          result += "/" + path2.slice(lastSlash + 1, index2)
        } else {
          result = path2.slice(lastSlash + 1, index2)
        }
        lastSegmentLength = index2 - lastSlash - 1
      }
      lastSlash = index2
      dots = 0
    } else if (code === 46 && dots > -1) {
      dots++
    } else {
      dots = -1
    }
  }
  return result
}
function assertPath(path2) {
  if (typeof path2 !== "string") {
    throw new TypeError(
      "Path must be a string. Received " + JSON.stringify(path2),
    )
  }
}

// node_modules/vfile/lib/minproc.browser.js
var proc = { cwd }
function cwd() {
  return "/"
}

// node_modules/vfile/lib/minurl.shared.js
function isUrl(fileURLOrPath) {
  return (
    fileURLOrPath !== null &&
    typeof fileURLOrPath === "object" &&
    fileURLOrPath.href &&
    fileURLOrPath.origin
  )
}

// node_modules/vfile/lib/minurl.browser.js
function urlToPath(path2) {
  if (typeof path2 === "string") {
    path2 = new URL(path2)
  } else if (!isUrl(path2)) {
    const error = new TypeError(
      'The "path" argument must be of type string or an instance of URL. Received `' +
        path2 +
        "`",
    )
    error.code = "ERR_INVALID_ARG_TYPE"
    throw error
  }
  if (path2.protocol !== "file:") {
    const error = new TypeError("The URL must be of scheme file")
    error.code = "ERR_INVALID_URL_SCHEME"
    throw error
  }
  return getPathFromURLPosix(path2)
}
function getPathFromURLPosix(url) {
  if (url.hostname !== "") {
    const error = new TypeError(
      'File URL host must be "localhost" or empty on darwin',
    )
    error.code = "ERR_INVALID_FILE_URL_HOST"
    throw error
  }
  const pathname = url.pathname
  let index2 = -1
  while (++index2 < pathname.length) {
    if (
      pathname.charCodeAt(index2) === 37 &&
      pathname.charCodeAt(index2 + 1) === 50
    ) {
      const third = pathname.charCodeAt(index2 + 2)
      if (third === 70 || third === 102) {
        const error = new TypeError(
          "File URL path must not include encoded / characters",
        )
        error.code = "ERR_INVALID_FILE_URL_PATH"
        throw error
      }
    }
  }
  return decodeURIComponent(pathname)
}

// node_modules/vfile/lib/index.js
var order = ["history", "path", "basename", "stem", "extname", "dirname"]
var VFile = class {
  constructor(value2) {
    let options
    if (!value2) {
      options = {}
    } else if (
      typeof value2 === "string" ||
      (0, import_is_buffer.default)(value2)
    ) {
      options = { value: value2 }
    } else if (isUrl(value2)) {
      options = { path: value2 }
    } else {
      options = value2
    }
    this.data = {}
    this.messages = []
    this.history = []
    this.cwd = proc.cwd()
    this.value
    this.stored
    this.result
    this.map
    let index2 = -1
    while (++index2 < order.length) {
      const prop2 = order[index2]
      if (prop2 in options && options[prop2] !== void 0) {
        this[prop2] = prop2 === "history" ? [...options[prop2]] : options[prop2]
      }
    }
    let prop
    for (prop in options) {
      if (!order.includes(prop)) this[prop] = options[prop]
    }
  }
  get path() {
    return this.history[this.history.length - 1]
  }
  set path(path2) {
    if (isUrl(path2)) {
      path2 = urlToPath(path2)
    }
    assertNonEmpty(path2, "path")
    if (this.path !== path2) {
      this.history.push(path2)
    }
  }
  get dirname() {
    return typeof this.path === "string" ? path.dirname(this.path) : void 0
  }
  set dirname(dirname2) {
    assertPath2(this.basename, "dirname")
    this.path = path.join(dirname2 || "", this.basename)
  }
  get basename() {
    return typeof this.path === "string" ? path.basename(this.path) : void 0
  }
  set basename(basename2) {
    assertNonEmpty(basename2, "basename")
    assertPart(basename2, "basename")
    this.path = path.join(this.dirname || "", basename2)
  }
  get extname() {
    return typeof this.path === "string" ? path.extname(this.path) : void 0
  }
  set extname(extname2) {
    assertPart(extname2, "extname")
    assertPath2(this.dirname, "extname")
    if (extname2) {
      if (extname2.charCodeAt(0) !== 46) {
        throw new Error("`extname` must start with `.`")
      }
      if (extname2.includes(".", 1)) {
        throw new Error("`extname` cannot contain multiple dots")
      }
    }
    this.path = path.join(this.dirname, this.stem + (extname2 || ""))
  }
  get stem() {
    return typeof this.path === "string"
      ? path.basename(this.path, this.extname)
      : void 0
  }
  set stem(stem) {
    assertNonEmpty(stem, "stem")
    assertPart(stem, "stem")
    this.path = path.join(this.dirname || "", stem + (this.extname || ""))
  }
  toString(encoding) {
    return (this.value || "").toString(encoding)
  }
  message(reason, place, origin) {
    const message = new VFileMessage(reason, place, origin)
    if (this.path) {
      message.name = this.path + ":" + message.name
      message.file = this.path
    }
    message.fatal = false
    this.messages.push(message)
    return message
  }
  info(reason, place, origin) {
    const message = this.message(reason, place, origin)
    message.fatal = null
    return message
  }
  fail(reason, place, origin) {
    const message = this.message(reason, place, origin)
    message.fatal = true
    throw message
  }
}
function assertPart(part, name) {
  if (part && part.includes(path.sep)) {
    throw new Error(
      "`" + name + "` cannot be a path: did not expect `" + path.sep + "`",
    )
  }
}
function assertNonEmpty(part, name) {
  if (!part) {
    throw new Error("`" + name + "` cannot be empty")
  }
}
function assertPath2(path2, name) {
  if (!path2) {
    throw new Error("Setting `" + name + "` requires `path` to be set too")
  }
}

// node_modules/unified/lib/index.js
var unified = base().freeze()
var own4 = {}.hasOwnProperty
function base() {
  const transformers = trough()
  const attachers = []
  let namespace = {}
  let frozen
  let freezeIndex = -1
  processor.data = data
  processor.Parser = void 0
  processor.Compiler = void 0
  processor.freeze = freeze
  processor.attachers = attachers
  processor.use = use
  processor.parse = parse3
  processor.stringify = stringify
  processor.run = run
  processor.runSync = runSync
  processor.process = process
  processor.processSync = processSync
  return processor
  function processor() {
    const destination = base()
    let index2 = -1
    while (++index2 < attachers.length) {
      destination.use(...attachers[index2])
    }
    destination.data((0, import_extend.default)(true, {}, namespace))
    return destination
  }
  function data(key, value2) {
    if (typeof key === "string") {
      if (arguments.length === 2) {
        assertUnfrozen("data", frozen)
        namespace[key] = value2
        return processor
      }
      return (own4.call(namespace, key) && namespace[key]) || null
    }
    if (key) {
      assertUnfrozen("data", frozen)
      namespace = key
      return processor
    }
    return namespace
  }
  function freeze() {
    if (frozen) {
      return processor
    }
    while (++freezeIndex < attachers.length) {
      const [attacher, ...options] = attachers[freezeIndex]
      if (options[0] === false) {
        continue
      }
      if (options[0] === true) {
        options[1] = void 0
      }
      const transformer = attacher.call(processor, ...options)
      if (typeof transformer === "function") {
        transformers.use(transformer)
      }
    }
    frozen = true
    freezeIndex = Number.POSITIVE_INFINITY
    return processor
  }
  function use(value2, ...options) {
    let settings
    assertUnfrozen("use", frozen)
    if (value2 === null || value2 === void 0) {
    } else if (typeof value2 === "function") {
      addPlugin(value2, ...options)
    } else if (typeof value2 === "object") {
      if (Array.isArray(value2)) {
        addList(value2)
      } else {
        addPreset(value2)
      }
    } else {
      throw new TypeError("Expected usable value, not `" + value2 + "`")
    }
    if (settings) {
      namespace.settings = Object.assign(namespace.settings || {}, settings)
    }
    return processor
    function add(value3) {
      if (typeof value3 === "function") {
        addPlugin(value3)
      } else if (typeof value3 === "object") {
        if (Array.isArray(value3)) {
          const [plugin, ...options2] = value3
          addPlugin(plugin, ...options2)
        } else {
          addPreset(value3)
        }
      } else {
        throw new TypeError("Expected usable value, not `" + value3 + "`")
      }
    }
    function addPreset(result) {
      addList(result.plugins)
      if (result.settings) {
        settings = Object.assign(settings || {}, result.settings)
      }
    }
    function addList(plugins) {
      let index2 = -1
      if (plugins === null || plugins === void 0) {
      } else if (Array.isArray(plugins)) {
        while (++index2 < plugins.length) {
          const thing = plugins[index2]
          add(thing)
        }
      } else {
        throw new TypeError("Expected a list of plugins, not `" + plugins + "`")
      }
    }
    function addPlugin(plugin, value3) {
      let index2 = -1
      let entry
      while (++index2 < attachers.length) {
        if (attachers[index2][0] === plugin) {
          entry = attachers[index2]
          break
        }
      }
      if (entry) {
        if (isPlainObject(entry[1]) && isPlainObject(value3)) {
          value3 = (0, import_extend.default)(true, entry[1], value3)
        }
        entry[1] = value3
      } else {
        attachers.push([...arguments])
      }
    }
  }
  function parse3(doc) {
    processor.freeze()
    const file = vfile(doc)
    const Parser = processor.Parser
    assertParser("parse", Parser)
    if (newable(Parser, "parse")) {
      return new Parser(String(file), file).parse()
    }
    return Parser(String(file), file)
  }
  function stringify(node, doc) {
    processor.freeze()
    const file = vfile(doc)
    const Compiler = processor.Compiler
    assertCompiler("stringify", Compiler)
    assertNode(node)
    if (newable(Compiler, "compile")) {
      return new Compiler(node, file).compile()
    }
    return Compiler(node, file)
  }
  function run(node, doc, callback) {
    assertNode(node)
    processor.freeze()
    if (!callback && typeof doc === "function") {
      callback = doc
      doc = void 0
    }
    if (!callback) {
      return new Promise(executor)
    }
    executor(null, callback)
    function executor(resolve, reject) {
      transformers.run(node, vfile(doc), done)
      function done(error, tree, file) {
        tree = tree || node
        if (error) {
          reject(error)
        } else if (resolve) {
          resolve(tree)
        } else {
          callback(null, tree, file)
        }
      }
    }
  }
  function runSync(node, file) {
    let result
    let complete
    processor.run(node, file, done)
    assertDone("runSync", "run", complete)
    return result
    function done(error, tree) {
      bail(error)
      result = tree
      complete = true
    }
  }
  function process(doc, callback) {
    processor.freeze()
    assertParser("process", processor.Parser)
    assertCompiler("process", processor.Compiler)
    if (!callback) {
      return new Promise(executor)
    }
    executor(null, callback)
    function executor(resolve, reject) {
      const file = vfile(doc)
      processor.run(processor.parse(file), file, (error, tree, file2) => {
        if (error || !tree || !file2) {
          done(error)
        } else {
          const result = processor.stringify(tree, file2)
          if (result === void 0 || result === null) {
          } else if (looksLikeAVFileValue(result)) {
            file2.value = result
          } else {
            file2.result = result
          }
          done(error, file2)
        }
      })
      function done(error, file2) {
        if (error || !file2) {
          reject(error)
        } else if (resolve) {
          resolve(file2)
        } else {
          callback(null, file2)
        }
      }
    }
  }
  function processSync(doc) {
    let complete
    processor.freeze()
    assertParser("processSync", processor.Parser)
    assertCompiler("processSync", processor.Compiler)
    const file = vfile(doc)
    processor.process(file, done)
    assertDone("processSync", "process", complete)
    return file
    function done(error) {
      complete = true
      bail(error)
    }
  }
}
function newable(value2, name) {
  return (
    typeof value2 === "function" &&
    value2.prototype &&
    (keys(value2.prototype) || name in value2.prototype)
  )
}
function keys(value2) {
  let key
  for (key in value2) {
    if (own4.call(value2, key)) {
      return true
    }
  }
  return false
}
function assertParser(name, value2) {
  if (typeof value2 !== "function") {
    throw new TypeError("Cannot `" + name + "` without `Parser`")
  }
}
function assertCompiler(name, value2) {
  if (typeof value2 !== "function") {
    throw new TypeError("Cannot `" + name + "` without `Compiler`")
  }
}
function assertUnfrozen(name, frozen) {
  if (frozen) {
    throw new Error(
      "Cannot call `" +
        name +
        "` on a frozen processor.\nCreate a new processor first, by calling it: use `processor()` instead of `processor`.",
    )
  }
}
function assertNode(node) {
  if (!isPlainObject(node) || typeof node.type !== "string") {
    throw new TypeError("Expected node, got `" + node + "`")
  }
}
function assertDone(name, asyncName, complete) {
  if (!complete) {
    throw new Error(
      "`" + name + "` finished async. Use `" + asyncName + "` instead",
    )
  }
}
function vfile(value2) {
  return looksLikeAVFile(value2) ? value2 : new VFile(value2)
}
function looksLikeAVFile(value2) {
  return Boolean(
    value2 &&
      typeof value2 === "object" &&
      "message" in value2 &&
      "messages" in value2,
  )
}
function looksLikeAVFileValue(value2) {
  return typeof value2 === "string" || (0, import_is_buffer2.default)(value2)
}

// node_modules/annotatedtext-remark/out/index.js
var defaults2 = {
  children(node) {
    return defaults.children(node)
  },
  annotatetextnode(node, text3) {
    return defaults.annotatetextnode(node, text3)
  },
  interpretmarkup(text3 = "") {
    return "\n".repeat((text3.match(/\n/g) || []).length)
  },
  remarkoptions: {},
}
function build2(text3, options = defaults2) {
  const processor = unified()
    .use(remark_parse_default, options.remarkoptions)
    .use(remarkFrontmatter, ["yaml", "toml"])
  return build(text3, processor.parse, options)
}

// lib/prepareMarkdown.mjs
var prepareMarkdown = (text3) => JSON.stringify(build2(text3))
var prepareMarkdown_default = prepareMarkdown
/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
