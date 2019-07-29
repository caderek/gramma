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

This package is in an early stage. It's functional, but still limited.
Feel free to try it for non-critical applications.

It uses [grammarbot.io](https://www.grammarbot.io/) as a backend.

## Installation

```
npm i gramma -g
```

## Usage

### Git-like commands

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

### I/O Redirection

You can also use Gramma as standard unix tool, working with stdin and stdout. There is no interactive mode in this approach (at least for now).

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

### JS API

In addition to command-line usage, you can use two exposed methods if you want to handle mistakes yourself.

#### check() method

Returns a promise with a raw grammarbot.io response body.

```js
const { check } = require("gramma")

check("Some text to check.").then(console.log)
```

#### replaceAll() method

Replaces words with provided ones. It takes an array of object in the following format:

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

const fix = async (text) => {
  const { matches } = await check(text)
  const replacements = prepareReplacements(matches) // your function

  return replaceAll(replacements)
}

const correctText = fix("Some text to check")
```

## License

Projects is under open, non-restrictive [ISC license](LICENSE)
