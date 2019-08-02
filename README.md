<h1 align="center">Gramma - command-line grammar checker</h1>
<div align="center">
Gramma is an interactive tool that helps you find and fix grammatical mistakes in files, strings, and input streams. You can also use it in a non-interactive way, as a simple linter for automation processes.

Gramma works on Linux, Windows, and macOS.

Gramma works out-of-the-box, communicating with [grammarbot.io](https://www.grammarbot.io/), but can also be easily configured to work with other compatible APIs, including local or remote [LanguageTool](http://wiki.languagetool.org/http-server) server.

<br>

</div>

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

## Table of contents

1. [Notes](#notes)
1. [Installation](#installation)
1. [Usage](#usage)
   1. [Check file](#check)
   1. [Check string](#listen)
   1. [Git commit with grammar check](#commit)
   1. [Configuration](#config)
   1. [I/O redirection](#io)
   1. [Managing a custom API server](#server)
   1. [JS API](#js)
1. [License](#license)

<a id='notes'></a>

## Notes

This package is in an early stage. It's functional, but still needs more testing and some refactoring.
Feel free to try it for non-critical applications.

<a id='installation'></a>

## Installation

### Via NPM

This is a recommended way for people who have Node.js and NPM already installed (or are willing to do so).

#### Global installation:

```sh
npm i gramma -g
```

#### Local installation (as a dev tool for your project):

```sh
npm i gramma -D
```

### Via binary package

If you prefer a single binary file (Node.js included) you can download it for the most popular platforms:

- [gramma-linux64.zip](https://github.com/caderek/gramma/releases/download/v0.7.0-beta/gramma-linux64.zip)
- [gramma-macos.zip](https://github.com/caderek/gramma/releases/download/v0.7.0-beta/gramma-macos.zip)
- [gramma-windows64.zip](https://github.com/caderek/gramma/releases/download/v0.7.0-beta/gramma-windows64.zip)

After downloading and unpacking the binary add it to your PATH or create a symlink to your executable directory (depending on the platform).

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

With Gramma, you can use a global and local configuration file. Local config overrides global properties - it is useful when you want to have dedicated config per project (for example to share it in Git repository). When neither file is present, the default config will be used.

Gramma will automatically generate configuration files when you add something to your config via `gramma config` command.

If you want to manually initialize local config, you can run `gramma init` command in your project's root directory. It is useful when you want to just override the global dictionary with local, empty one - so your project is not dependent on your private dictionary.

You can check the path to the global configuration file via `gramma paths` command.
The local configuration file is created in your working directory under `.gramma.json` name.

- Using a custom API server

  To use locally installed, open-source LanguageTool server, follow the instructions on this site: [LanguageTool server](http://wiki.languagetool.org/http-server)

  After that, you can change default API endpoint (`http://api.grammarbot.io/v2/check`) by running this command:

  ```sh
  gramma config -g api_url <custom_api_url>
  ```

  For example, for local installation of LanguageTool, default setup looks like this:

  ```sh
  gramma config -g api_url http://localhost:8081/v2/check
  ```

  <hr>

  Additionally, Gramma can start the API server automatically for you!
  Just add starting command to your config:

  ```sh
  gramma config -g server_command <starting_command>
  ```

  For example:

  ```sh
  gramma config -g server_command "java -cp ~/Other/LanguageTool/languagetool-server.jar org.languagetool.server.HTTPServer --port 8081"
  ```

  Remember to quote the command and provide the full path to `languagetool-server.jar` file!

  <hr>

  If you do not want the server to run all the time, you can configure Gramma to run it only when needed (run -> check -> close):

  ```sh
  gramma config -g server_once true
  ```

  You can skip `-g` flags to add this setup locally for your project.

  That's it. Gramma will now take care of running the server!

* Adding API key (grammarbot.io only)

  By default, gramma uses a blank key, that gives you 100 checks per day.
  You can increase that limit to 250 by registering on [grammarbot.io/signup](https://www.grammarbot.io/signup) (it's free). When you register, you will receive an API key that you can use in Gramma. For example, adding "XXXXXXXX" API key to global config will look like this:

  ```sh
  gramma config -g api_key XXXXXXXX
  ```

  If you want to add different key locally just skip the `-g` (`--global`) flag:

  ```sh
  gramma config api_key YYYYYYYY
  ```

* Adding a word to the dictionary

  Usually, you will add custom words to the local or global dictionary via interactive menu during the fix process, but you can also make it via separate command:

  ```sh
  # Add a word to the local dictionary
  gramma config dictionary MyWord

  # Add a word to the global dictionary
  gramma config -g dictionary MyWord
  ```

  You can also add custom words directly to the config file, it's an array under `dictionary` key.

<a id='io'></a>

### I/O Redirection

You can also use Gramma as standard shell tool by running it without arguments and working with stdin and stdout. There is no interactive mode in this approach. There are also no colors in the output, just plain text.

When you simply type `gramma` and press Enter, Gramma will open an input stream where you can type your phrase. After accepting it with Enter, Gramma will list all potential mistakes. This behavior is not very useful by itself, but when you combine it with pipes and redirection it becomes a convenient tool for usage inside a CI pipeline, etc.

#### Examples

```sh
# check a string and print the result on the screen:
echo "Some text" | gramma

# check a string and save the result to a file:
echo "Some text" | gramma > myFile.txt

# check a file and print the result on the screen:
gramma < myInputFile.txt

# check a file and save the result to a file:
gramma < myInputFile.txt > myOutputFile.txt
```

<a id='server'></a>

### Managing custom API server

If you [configured custom API server](#config), Gramma will manage server automatically, nevertheless there might be situations, when you want to manage server manually. Gramma simplifies this by integrating basic server commands:

- Starting server

  ```sh
  gramma server start -g
  ```

  Note: When you use this command, Gramma will ignore `server_once` config option. This is the expected behavior - I assume that if you use this command, you want the server to actually run, not stop after the first check.

- Stopping server

  ```sh
  gramma server stop -g
  ```

- Getting server PID

  ```sh
  gramma server pid -g
  ```

You should skip the `-g` flag if you want to menage server dedicated to the project, not a global one.

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

You can find proper `offset` and `length` values in the object returned by `check()` method.

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
