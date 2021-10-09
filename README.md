<h1 align="center" style="border: none">Gramma - command-line grammar checker</h1>

Gramma is an interactive tool that helps you find and fix grammatical mistakes in files and text strings. You can also use it in a non-interactive way, as a simple linter for automation processes.

Gramma works on Linux, Windows, and macOS.

Gramma supports many languages. You can find a full list <a href="https://languagetool.org/languages">here</a>.

Gramma works out-of-the-box, communicating with [languagetool.org](https://languagetool.org), but can also be easily configured to work with other compatible APIs, including local or remote [LanguageTool server](https://dev.languagetool.org/http-server).

<hr>

<div align="center">
<img src="https://img.shields.io/npm/v/gramma.svg" alt="npm version">
<a href="https://circleci.com/gh/caderek/gramma/tree/master" target="_blank"><img src="https://img.shields.io/circleci/build/github/caderek/gramma.svg" alt="CircleCI"></a>
<img src="https://img.shields.io/node/v/gramma.svg" alt="node version">
<img src="https://img.shields.io/npm/l/gramma.svg" alt="npm license">

</div>

<div style="margin-top: 30px;" align="center">
<img src="docs/example.gif" alt="Example" style="border-radius: 10px;">
</div>

## Contents

1. [Installation](#installation)
1. [Usage](#usage)
   - [Check file](#usage-check)
   - [Check string](#usage-listen)
   - [Git commit with grammar check](#usage-commit)
   - [Command-line options](#usage-options)
1. [Configuration](#config)
   - [Introduction](#config-intro)
   - [Checker settings](#config-checker)
   - [Customizing API server](#config-server)
1. [Managing a local server](#server)
1. [JS API](#js)
1. [License](#license)

<a id='installation'></a>

## Installation

### Via NPM

It is the recommended way if you have Node.js and NPM already installed (or you are willing to do it).

#### Global installation:

```
npm i gramma -g
```

#### Local installation (as a dev tool for your project):

```
npm i gramma -D
```

### Via binary package

If you prefer a single binary file (Node.js included), you can download it for the most popular platforms:

<!--BIN-->

- [gramma-linux64-v1.2.0.zip](https://github.com/caderek/gramma/releases/download/v1.2.0/gramma-linux64-v1.2.0.zip)
- [gramma-macos-v1.2.0.zip](https://github.com/caderek/gramma/releases/download/v1.2.0/gramma-macos-v1.2.0.zip)
- [gramma-windows64-v1.2.0.zip](https://github.com/caderek/gramma/releases/download/v1.2.0/gramma-windows64-v1.2.0.zip)

<!--/BIN-->

After downloading and unpacking the binary, add it to your PATH or create a symlink to your executable directory (depending on the platform).

### Installing local server

If you don't want to use a public API, you can install a local LanguageTool server:

```
gramma server install
```

For this to work, you have to install Java 1.8 or higher (you can find it [here](https://adoptium.net)). You can check if you have it installed already by running:

```
java -version
```

That's it - Gramma will now use and manage the local server automatically.

<a id='usage'></a>

## Usage

<a id='usage-check'></a>

### Check file

Interactive fix:

```
gramma check [file]
```

Just print potential mistakes and return status code:

```
gramma check -p [file]
```

Examples:

```
gramma check path/to/my_file.txt
```

```
gramma check -p path/to/other/file.txt
```

<a id='usage-listen'></a>

### Check string

Interactive fix:

```
gramma listen [text]
```

Just print potential mistakes and return status code:

```
gramma listen -p [text]
```

Examples:

```
gramma listen "This sentence will be checked interactively."
```

```
gramma listen -p "Suggestions for this sentence will be printed."
```

<a id='usage-commit'></a>

### Git commit with grammar check

**TIP:** You can use `gramma hook` instead of the commands below, that way Gramma will be seamlessly integrated with Git.

Equivalent to `git commit -m [message]`:

```
gramma commit [text]
```

Equivalent to `git commit -am [message]`:

```
gramma commit -a [text]
```

Examples:

```
gramma commit "My commit message"
```

```
gramma commit -a "Another commit message (files added)"
```

<a id='usage-options'></a>

### Command-line options

_Note: This section describes options for grammar-checking commands only. Other command-specific options are described in their respectful sections of this document._

- `-p / --print` - check text in the non-interactive mode
- `-n / --no-colors` - when paired with the `-p` flag, removes colors from the output
- `-d / --disable <rule>` - disable specific [rule](#available-rules)
- `-e / --enable <rule>` - enable specific [rule](#available-rules)
- `-l / --language <language_code>` - mark a text as written in provided [language](#available-languages)
- `-m / --markdown` - treat the input as markdown (removes some false-positives)

You can enable or disable multiple rules in one command by using a corresponding option multiple times. You can also compound boolean options if you use their short version.

Example:

```
gramma listen "I like making mistkaes!" -pn -d typos -d typography -e casing -l en-GB
```

<a id='config'></a>

## Configuration

<a id='config-intro'></a>

### Introduction

With Gramma, you can use a global and local configuration file. Gramma will use a proper config file following their priority:

1. Command-line options
2. Local config
3. Global config
4. Default config

Gramma will automatically generate configuration files when you add something to your config via `gramma config` command.

If you want to manually initialize local config with default options, you can run the following command in your project's root directory:

```
gramma init
```

By doing so, your project will not depend on your user's setting. It is useful when you want to share your project with others, for example via Git repository.

During initialization, Gramma will ask you if you want to add a Git hook (`commit-msg`). It will create a hook (appending to the existing one or creating new).

You can toggle Git hook via:

```
gramma hook
```

You can check the path to the global configuration file (as well as other paths used by Gramma) via the following command:

```
gramma paths
```

Gramma creates the local configuration in your working directory under `.gramma.json` name.

You can change your settings by manually editing configuration files or running:

```
gramma config <setting> <value> [-g]
```

`-g` (`--global`) flag is optional and controls whether the global or the local config will be altered.

_Note: All examples below use the global config. If you want to use a local one, skip the `-g` flag._

<a id='config-checker'></a>

### Checker settings

#### Adding a word to the dictionary

Usually, you will add custom words to the local or global dictionary via interactive menu during the fix process, but you can also make it via separate command:

```
gramma config dictionary <your_word> -g
```

#### Changing default language

```
gramma config language <language_code> -g
```

<a id="available-languages"></a>

<details>
  <summary style="outline: none; cursor: pointer">Available languages (click to expand)</summary>
  <table>
      <tr>
        <th>Code</th>
        <th>Name</th>
        <th>languagetool.org</th>
        <th>grammarbot.io</th>
        <th>local</th>
      </tr>
      <tr>
        <td><tt style="white-space: pre;">auto</tt></td>
        <td>automatic language detection</td>
        <td>✔</td>
        <td>✔</td>
        <td>✔</td>
      </tr>
      <!--LANG-->
      <tr>
        <td><tt style="white-space: pre;">ar</tt></td>
        <td>Arabic</td>
        <td>✔</td>
        <td>-</td>
        <td>✔</td>
      </tr>
      <tr>
        <td><tt style="white-space: pre;">ast-ES</tt></td>
        <td>Asturian</td>
        <td>✔</td>
        <td>✔</td>
        <td>✔</td>
      </tr>
      <tr>
        <td><tt style="white-space: pre;">be-BY</tt></td>
        <td>Belarusian</td>
        <td>✔</td>
        <td>✔</td>
        <td>✔</td>
      </tr>
      <tr>
        <td><tt style="white-space: pre;">br-FR</tt></td>
        <td>Breton</td>
        <td>✔</td>
        <td>✔</td>
        <td>✔</td>
      </tr>
      <tr>
        <td><tt style="white-space: pre;">ca-ES</tt></td>
        <td>Catalan</td>
        <td>✔</td>
        <td>✔</td>
        <td>✔</td>
      </tr>
      <tr>
        <td><tt style="white-space: pre;">ca-ES-valencia</tt></td>
        <td>Catalan (Valencian)</td>
        <td>✔</td>
        <td>✔</td>
        <td>✔</td>
      </tr>
      <tr>
        <td><tt style="white-space: pre;">zh-CN</tt></td>
        <td>Chinese</td>
        <td>✔</td>
        <td>-</td>
        <td>✔</td>
      </tr>
      <tr>
        <td><tt style="white-space: pre;">da-DK</tt></td>
        <td>Danish</td>
        <td>✔</td>
        <td>✔</td>
        <td>✔</td>
      </tr>
      <tr>
        <td><tt style="white-space: pre;">nl</tt></td>
        <td>Dutch</td>
        <td>✔</td>
        <td>✔</td>
        <td>✔</td>
      </tr>
      <tr>
        <td><tt style="white-space: pre;">nl-BE</tt></td>
        <td>Dutch (Belgium)</td>
        <td>✔</td>
        <td>-</td>
        <td>✔</td>
      </tr>
      <tr>
        <td><tt style="white-space: pre;">en</tt></td>
        <td>English</td>
        <td>✔</td>
        <td>✔</td>
        <td>✔</td>
      </tr>
      <tr>
        <td><tt style="white-space: pre;">en-AU</tt></td>
        <td>English (Australian)</td>
        <td>✔</td>
        <td>✔</td>
        <td>✔</td>
      </tr>
      <tr>
        <td><tt style="white-space: pre;">en-CA</tt></td>
        <td>English (Canadian)</td>
        <td>✔</td>
        <td>✔</td>
        <td>✔</td>
      </tr>
      <tr>
        <td><tt style="white-space: pre;">en-GB</tt></td>
        <td>English (GB)</td>
        <td>✔</td>
        <td>✔</td>
        <td>✔</td>
      </tr>
      <tr>
        <td><tt style="white-space: pre;">en-NZ</tt></td>
        <td>English (New Zealand)</td>
        <td>✔</td>
        <td>✔</td>
        <td>✔</td>
      </tr>
      <tr>
        <td><tt style="white-space: pre;">en-ZA</tt></td>
        <td>English (South African)</td>
        <td>✔</td>
        <td>✔</td>
        <td>✔</td>
      </tr>
      <tr>
        <td><tt style="white-space: pre;">en-US</tt></td>
        <td>English (US)</td>
        <td>✔</td>
        <td>✔</td>
        <td>✔</td>
      </tr>
      <tr>
        <td><tt style="white-space: pre;">eo</tt></td>
        <td>Esperanto</td>
        <td>✔</td>
        <td>✔</td>
        <td>✔</td>
      </tr>
      <tr>
        <td><tt style="white-space: pre;">fr</tt></td>
        <td>French</td>
        <td>✔</td>
        <td>-</td>
        <td>✔</td>
      </tr>
      <tr>
        <td><tt style="white-space: pre;">gl-ES</tt></td>
        <td>Galician</td>
        <td>✔</td>
        <td>✔</td>
        <td>✔</td>
      </tr>
      <tr>
        <td><tt style="white-space: pre;">de</tt></td>
        <td>German</td>
        <td>✔</td>
        <td>-</td>
        <td>✔</td>
      </tr>
      <tr>
        <td><tt style="white-space: pre;">de-AT</tt></td>
        <td>German (Austria)</td>
        <td>✔</td>
        <td>-</td>
        <td>✔</td>
      </tr>
      <tr>
        <td><tt style="white-space: pre;">de-DE</tt></td>
        <td>German (Germany)</td>
        <td>✔</td>
        <td>-</td>
        <td>✔</td>
      </tr>
      <tr>
        <td><tt style="white-space: pre;">de-CH</tt></td>
        <td>German (Swiss)</td>
        <td>✔</td>
        <td>-</td>
        <td>✔</td>
      </tr>
      <tr>
        <td><tt style="white-space: pre;">el-GR</tt></td>
        <td>Greek</td>
        <td>✔</td>
        <td>✔</td>
        <td>✔</td>
      </tr>
      <tr>
        <td><tt style="white-space: pre;">ga-IE</tt></td>
        <td>Irish</td>
        <td>✔</td>
        <td>-</td>
        <td>✔</td>
      </tr>
      <tr>
        <td><tt style="white-space: pre;">it</tt></td>
        <td>Italian</td>
        <td>✔</td>
        <td>-</td>
        <td>✔</td>
      </tr>
      <tr>
        <td><tt style="white-space: pre;">ja-JP</tt></td>
        <td>Japanese</td>
        <td>✔</td>
        <td>✔</td>
        <td>✔</td>
      </tr>
      <tr>
        <td><tt style="white-space: pre;">km-KH</tt></td>
        <td>Khmer</td>
        <td>✔</td>
        <td>✔</td>
        <td>✔</td>
      </tr>
      <tr>
        <td><tt style="white-space: pre;">fa</tt></td>
        <td>Persian</td>
        <td>✔</td>
        <td>✔</td>
        <td>✔</td>
      </tr>
      <tr>
        <td><tt style="white-space: pre;">pl-PL</tt></td>
        <td>Polish</td>
        <td>✔</td>
        <td>✔</td>
        <td>✔</td>
      </tr>
      <tr>
        <td><tt style="white-space: pre;">pt</tt></td>
        <td>Portuguese</td>
        <td>✔</td>
        <td>-</td>
        <td>✔</td>
      </tr>
      <tr>
        <td><tt style="white-space: pre;">pt-AO</tt></td>
        <td>Portuguese (Angola preAO)</td>
        <td>✔</td>
        <td>-</td>
        <td>✔</td>
      </tr>
      <tr>
        <td><tt style="white-space: pre;">pt-BR</tt></td>
        <td>Portuguese (Brazil)</td>
        <td>✔</td>
        <td>-</td>
        <td>✔</td>
      </tr>
      <tr>
        <td><tt style="white-space: pre;">pt-MZ</tt></td>
        <td>Portuguese (Moçambique preAO)</td>
        <td>✔</td>
        <td>-</td>
        <td>✔</td>
      </tr>
      <tr>
        <td><tt style="white-space: pre;">pt-PT</tt></td>
        <td>Portuguese (Portugal)</td>
        <td>✔</td>
        <td>-</td>
        <td>✔</td>
      </tr>
      <tr>
        <td><tt style="white-space: pre;">ro-RO</tt></td>
        <td>Romanian</td>
        <td>✔</td>
        <td>✔</td>
        <td>✔</td>
      </tr>
      <tr>
        <td><tt style="white-space: pre;">ru-RU</tt></td>
        <td>Russian</td>
        <td>✔</td>
        <td>-</td>
        <td>✔</td>
      </tr>
      <tr>
        <td><tt style="white-space: pre;">de-DE-x-simple-language</tt></td>
        <td>Simple German</td>
        <td>✔</td>
        <td>✔</td>
        <td>✔</td>
      </tr>
      <tr>
        <td><tt style="white-space: pre;">sk-SK</tt></td>
        <td>Slovak</td>
        <td>✔</td>
        <td>✔</td>
        <td>✔</td>
      </tr>
      <tr>
        <td><tt style="white-space: pre;">sl-SI</tt></td>
        <td>Slovenian</td>
        <td>✔</td>
        <td>✔</td>
        <td>✔</td>
      </tr>
      <tr>
        <td><tt style="white-space: pre;">es</tt></td>
        <td>Spanish</td>
        <td>✔</td>
        <td>-</td>
        <td>✔</td>
      </tr>
      <tr>
        <td><tt style="white-space: pre;">es-AR</tt></td>
        <td>Spanish (voseo)</td>
        <td>✔</td>
        <td>-</td>
        <td>✔</td>
      </tr>
      <tr>
        <td><tt style="white-space: pre;">sv</tt></td>
        <td>Swedish</td>
        <td>✔</td>
        <td>✔</td>
        <td>✔</td>
      </tr>
      <tr>
        <td><tt style="white-space: pre;">tl-PH</tt></td>
        <td>Tagalog</td>
        <td>✔</td>
        <td>✔</td>
        <td>✔</td>
      </tr>
      <tr>
        <td><tt style="white-space: pre;">ta-IN</tt></td>
        <td>Tamil</td>
        <td>✔</td>
        <td>✔</td>
        <td>✔</td>
      </tr>
      <tr>
        <td><tt style="white-space: pre;">uk-UA</tt></td>
        <td>Ukrainian</td>
        <td>✔</td>
        <td>✔</td>
        <td>✔</td>
      </tr>
      <!--/LANG-->
  </table>
</details>

_Note: By default, Gramma uses US English (`en-US`)._

#### Enabling and disabling rules

Enabling a specific rule:

```
gramma config enable <rule_name> -g
```

Disabling a specific rule:

```
gramma config disable <rule_name> -g
```

<a id="available-rules"></a>

<details>
  <summary style="outline: none; cursor: pointer">Available rules (click to expand)</summary>
  <ul>
      <li><tt style="white-space: pre;">casing</tt></li>
      <li><tt style="white-space: pre;">colloquialisms</tt></li>
      <li><tt style="white-space: pre;">compounding</tt></li>
      <li><tt style="white-space: pre;">confused_words</tt></li>
      <li><tt style="white-space: pre;">false_friends</tt></li>
      <li><tt style="white-space: pre;">gender_neutrality</tt></li>
      <li><tt style="white-space: pre;">grammar</tt></li>
      <li><tt style="white-space: pre;">misc</tt></li>
      <li><tt style="white-space: pre;">punctuation</tt></li>
      <li><tt style="white-space: pre;">redundancy</tt></li>
      <li><tt style="white-space: pre;">regionalisms</tt></li>
      <li><tt style="white-space: pre;">repetitions</tt></li>
      <li><tt style="white-space: pre;">semantics</tt></li>
      <li><tt style="white-space: pre;">style</tt></li>
      <li><tt style="white-space: pre;">typography</tt></li>
      <li><tt style="white-space: pre;">typos</tt></li>
  </ul>
</details>

You can find a description of each rule [here](https://languagetool.org/development/api/org/languagetool/rules/Categories.html).

_Note: By default, all rules are enabled._

<a id='config-server'></a>

### Customizing API server

#### Defining custom API endpoint

If you want to use remote LanguageTool server, or use one already installed in your system (not installed via `gramma server install`), you can define a custom API endpoint:

```
gramma config api_url <custom_api_endpoint> -g
```

Example

```
gramma config api_url http://my-custom-api-url.xyz/v2/check -g
```

#### Running local server only when needed

If you do not want the local server to run all the time, you can configure Gramma to run it only when needed (`run → check → close`). It is useful when you run Gramma only from time to time and want to lower the memory consumption:

```
gramma config server_once true -g
```

_Note: This setting requires the `-g` flag because all local API server settings are stored in the global config._

#### Adding API key

_Note: This option applies to grammarbot.io and languagetool.org API only._

If you use a paid option on [grammarbot.io](https://www.grammarbot.io/) or [languagetool.org](https://languagetool.org), you will receive an API key that you can use in Gramma:

```
gramma config api_key <your_api_key> -g
```

<a id='server'></a>

## Managing a local server

If you have [configured a custom API server](#config), Gramma will manage the server automatically - nevertheless, there might be situations when you want to manage the server manually. Gramma simplifies this by exposing basic server commands:

#### Starting server

```
gramma server start
```

_Note: When you use this command, Gramma will ignore `server_once` config option. This is expected behavior - I assume that if you use this command, you want the server to actually run, not stop after the first check._

#### Stopping server

```
gramma server stop
```

#### Getting server PID

```
gramma server pid
```

#### Opening built-in GUI

```
gramma server gui
```

<a id='js'></a>

## JS API

In addition to command-line usage, you can use two exposed methods if you want to handle mistakes by yourself.

#### check() method

Returns a promise with a check result.

```js
const { check } = require("gramma")

check("Some text to check.").then(console.log)
```

You can also pass a second argument - an options object. Available options:

- `api_url` - url to a non-default API server
- `api_key` - server API key
- `dictionary` - an array of words that should be whitelisted
- `language` - language code to specify the text language
- `rules` - object defining which rules should be disabled

<details>
<summary style="outline: none; cursor: pointer">Default options object (click to expand)</summary>
<pre>
{
  "api_url": "http://api.grammarbot.io/v2/check",
  "api_key": "",
  "dictionary": [],
  "language": "en-US",
  "rules": {
    "casing": true,
    "colloquialisms": true,
    "compounding": true,
    "confused_words": true,
    "false_friends": true,
    "gender_neutrality": true,
    "grammar": true,
    "misc": true,
    "punctuation": true,
    "redundancy": true,
    "regionalisms": true,
    "repetitions": true,
    "semantics": true,
    "style": true,
    "typography": true,
    "typos": true
  }
}
</pre>
</details>

You can find all available values for each setting in the [configuration section](#config) of this document.

Example with all options set:

```js
const { check } = require("gramma")

check("Some text to check.", {
  api_url: "http://my-custom-language-tool-server.xyz/v2/check",
  api_key: "SOME_API_KEY",
  dictionary: ["npm", "gramma"],
  language: "pl-PL",
  rules: {
    typography: false,
    casing: false,
  },
}).then(console.log)
```

#### replaceAll() method

Replace words with provided ones. It takes an array of objects in the following format:

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

  return replaceAll(text, replacements)
}

const main = () => {
  const correctText = await fix("Some text to check")
  console.log(correctText)
}

main()
```

<a id='license'></a>

## License

The project is under open, non-restrictive [ISC license](LICENSE).
