<h1 align="center">Gramma - command line grammar checker</h1>
<div align="center">
<img src="https://img.shields.io/npm/v/gramma.svg" alt="npm version">
<img src="https://img.shields.io/npm/l/gramma.svg" alt="npm license">
<img src="https://img.shields.io/node/v/gramma.svg" alt="node version">
<img src="https://img.shields.io/npm/dw/gramma.svg" alt="npm downloads per week">

<a href="https://circleci.com/gh/caderek/gramma/tree/master" target="_blank"><img src="https://img.shields.io/circleci/build/github/caderek/gramma.svg" alt="CircleCI"></a>
<img src="https://img.shields.io/david/caderek/gramma.svg" alt="dependencies status">
<img src="https://img.shields.io/github/issues-raw/caderek/gramma.svg" alt="Github issues">
<img src="https://img.shields.io/github/last-commit/caderek/gramma.svg" alt="Github last commit">

<!-- <a href="https://www.codacy.com/app/caderek/gramma?utm_source=github.com&utm_medium=referral&utm_content=caderek/gramma&utm_campaign=Badge_Grade" target="_blank"><img src="https://img.shields.io/codacy/grade/47a1c8bb12644bd6a0303d642db1cdae.svg" alt="Codacy grade"></a> -->
<!-- <a href="https://www.codacy.com/app/caderek/gramma?utm_source=github.com&utm_medium=referral&utm_content=caderek/gramma&utm_campaign=Badge_Coverage" target="_blank"><img src="https://img.shields.io/codacy/coverage/47a1c8bb12644bd6a0303d642db1cdae.svg" alt="Codacy coverage"></a> -->
<!-- <a href="https://discord.gg/6RjmNx6" target="_blank"><img src="https://img.shields.io/discord/602308081279303692.svg" alt="discord"></a> -->
<!-- <img src="https://img.shields.io/github/languages/code-size/caderek/gramma.svg" alt="GitHub code size in bytes"> -->
<hr>

<img src="docs/example.gif" alt="Example">
</div>

## Notes

This package is in an early stage. It's functional, but still needs more testing and some refactoring.
Feel free to try it for non-critical applications.

## Table of contents

1. [Installation](#installation)
1. [Usage](#usage)
   1. [Check file](#check)
   1. [Check string](#listen)
   1. [Git commit with grammar check](#commit)
   1. [Configuration](#config)
   1. [I/O redirection](#io)
   1. [JS API](#js)
1. [License](#license)

It uses [grammarbot.io](https://www.grammarbot.io/) as a backend.

<a id='installation'></a>

## Installation

Global:

```sh
npm i gramma -g
```

Local (as a dev tool for your project):

```sh
npm i gramma -D
```

<a id='usage'></a>

## Usage

### Git-like commands

<a id='check'></a>

#### Check file

- Interactive fix:

  ```
  gramma check [file]
  ```

- Just print potential mistakes and return status code:

  ```
  gramma check -p [file]
  ```

- Examples:

  ```sh
  gramma check path/to/my_file.txt
  ```

  ```sh
  gramma check -p path/to/other/file.txt
  ```

<a id='listen'></a>

#### Check string

- Interactive fix:

  ```
  gramma listen [text]
  ```

- Just print potential mistakes and return status code:

  ```
  gramma listen -p [text]
  ```

- Examples:

  ```sh
  gramma listen "This sentence will be checked interactively."
  ```

  ```sh
  gramma listen -p "Suggestions for this sentence will be printed."
  ```

<a id='commit'></a>

#### Git commit with grammar check

- Equivalent to `git commit -m [message]`:

  ```
  gramma commit [text]
  ```

- Equivalent to `git commit -am [message]`:

  ```
  gramma commit -a [text]
  ```

- Examples:

  ```sh
  gramma commit "My commit message"
  ```

  ```sh
  gramma commit -a "Another commit message (files added)"
  ```

<a id='config'></a>

#### Gramma configuration

With Gramma, you can use global and local configuration file. Local config override global properties - it is useful when you want to have dedicated config per project (for example to share it in Git repository). When nether file is present, default config will be used.

Gramma will automatically generate configuration files when you run add something to your config via `gramma config` command.

If you want to manually initialize local config, you can run `gramma init` command in your project's root directory. It is useful when you want to just override global dictionary with local, empty one - so your project is not dependent on your private dictionary.

Local configuration file name: `.gramma.json`

You can check path to the global config via `gramma paths` command.

- Adding API key

By default, gramma uses a blank key, that gives you 100 checks per day.
  You can increase that limit to 250 by registering on [grammarbot.io/signup](https://www.grammarbot.io/signup) (it's free). When you register, you will receive an API key that you can use in Gramma. For example, adding "XXXXXXXX" API key to global config will look like this:

  ```sh
  gramma config -g api_key XXXXXXXX
  ```

  If you want to add different key locally just skip the `-g` (`--global`) flag:

  ```sh
  gramma config api_key YYYYYYYY
  ```

- Adding word to a dictionary

  Usually you will add custom words to local or global dictionary via interactive menu during fix process, but you can also make it via separate command:

  ```sh
  # Add a word to the local dictionary
  gramma config dictionary MyWord

  # Add a word to the global dictionary
  gramma config -g dictionary MyWord
  ```

  You can also add custom words directly to the config file, it's an array under `dictionary` key.

<a id='io'></a>

### I/O Redirection

You can also use Gramma as standard shell tool, working with stdin and stdout. There is no interactive mode in this approach (at least for now).

#### Examples

```sh
# check string and print result on screen:
echo "Some text" | gramma

# check string and save result to a file:
echo "Some text" | gramma > myFile.txt

# check file and print result on screen:
gramma < myInputFile.txt

# check file and save result to a file:
gramma < myInputFile.txt > myOutputFile.txt
```

<a id='js'></a>

### JS API

In addition to command-line usage, you can use two exposed methods if you want to handle mistakes yourself.

#### check() method

Returns a promise with a check result.

```js
const { check } = require("gramma")

check("Some text to check.").then(console.log)
```

You can also pass a second argument: dictionary, an array of words that should be whitelisted.

```js
const { check } = require("gramma")

check("Some text to check.", ["npm", "gramma"]).then(console.log)
```

#### replaceAll() method

Replace words with provided ones. It takes an array of object in the following format:

```js
const exampleReplacements = [
  { offset: 6, length: 3, change: "correct phrase" },
  { offset: 20, length: 7, change: "another phrase" },
]
```

You can find proper `offset` and `length` values in object returned by `check()` method.

Example usage:

```js
const { check, replaceAll } = require("gramma")

/** Your custom function **/
const prepareReplacements = (matches) => {
  // your code...
}

const fix = async (text) => {
  const { matches } = await check(text)
  const replacements = prepareReplacements(matches)

  return replaceAll(replacements)
}

const main = () => {
  const correctText = await fix("Some text to check")
  console.log(correctText)
}

main()
```

<a id='license'></a>

## License

Projects is under open, non-restrictive [ISC license](LICENSE)
