<div align="center">
    <img src="assets/gramma-logo.png" alt="gramma-logo" />
</div>
<div align="center">
    <img src="assets/gramma-text.png" alt="gramma-title" />
</div>

<!-- Gramma is an interactive tool that helps you find and fix grammatical mistakes in files and text strings. You can also use it in a non-interactive way, as a simple linter for automation processes.

Gramma works on Linux, Windows, and macOS.

Gramma supports many languages. You can find a full list <a href="https://languagetool.org/languages">here</a>.

Gramma works out-of-the-box, communicating with [languagetool.org](https://languagetool.org), but can also be easily configured to work with other compatible APIs, including local or remote [LanguageTool server](https://dev.languagetool.org/http-server). -->

<div>&nbsp;</div>

<div align="center">
<a href="https://circleci.com/gh/caderek/gramma/tree/master" target="_blank"><img src="https://img.shields.io/circleci/build/github/caderek/gramma.svg?labelColor=024160" alt="CircleCI"></a>
<img src="https://img.shields.io/npm/v/gramma.svg?labelColor=024160&color=0081B8" alt="npm version">
<img src="https://img.shields.io/node/v/gramma.svg?labelColor=024160&color=0081B8" alt="node version">
<img src="https://img.shields.io/npm/l/gramma.svg?labelColor=024160&color=0081B8" alt="npm license">
</div>
 
<div>&nbsp;</div>

<div align="center">
<img src="docs/example.gif" alt="Example" style="border-radius: 10px;">
</div>

<div>&nbsp;</div>
<div><img src="assets/divider.png" width="838" alt="---" class="divider" /></div>

## Features

- Provides advanced grammar checks via LanguageTool (remote API or local server).
- Supports global and local (per-project) configuration.
- Supports plain text and markdown.
- Git integration!
- Fully interactive!

<div><img src="assets/divider.png" width="838" alt="---" class="divider" /></div>

## Contents

1. [Installation](#installation)
   - [Via NPM (global)](#installation-npm)
   - [Standalone binary](#installation-binary)
   - [Dev tool for JS/TS projects](#installation-dev)
   - [Local LanguageTool server (optional)](#installation-server)
1. [Usage](#usage)
   - [Check file](#usage-check)
   - [Check string](#usage-listen)
   - [Git commit with grammar check](#usage-commit)
   - [Command-line options](#usage-options)
   - [Usage inside VIM](#usage-vim)
1. [Configuration](#config)
   - [Introduction](#config-intro)
   - [Local config](#config-local)
   - [Git integration](#config-git)
   - [Checker settings](#config-checker)
   - [Customizing API server](#config-server)
   - [Security](#config-security)
1. [Managing a local server](#server)
1. [JS API](#js)
1. [License](#license)

<a id='installation'></a>

<div><img src="assets/divider.png" width="838" alt="---" class="divider" /></div>

## Installation

<a id='installation-npm'></a>

### Via NPM

It is the recommended way if you have Node.js already installed (or you are willing to do so).

```
npm i gramma -g
```

<hr/>

<a id='installation-binary'></a>

### Standalone binary

If you prefer a single binary file, you can download it for the most popular platforms:

- [gramma-linux64-v1.6.0.zip](https://github.com/caderek/gramma/releases/download/v1.6.0/gramma-linux64-v1.6.0.zip)
- [gramma-macos-v1.6.0.zip](https://github.com/caderek/gramma/releases/download/v1.6.0/gramma-macos-v1.6.0.zip)
- [gramma-windows64-v1.6.0.zip](https://github.com/caderek/gramma/releases/download/v1.6.0/gramma-windows64-v1.6.0.zip)

After downloading and unpacking the binary, add it to your PATH or create a symlink to your executable directory (depending on the platform).

<hr/>

<a id='installation-dev'></a>

### Dev tool for JS/TS projects

You can install Gramma locally for your JS/TS project - this method gives you a separate, project specific config.

```
npm i gramma -D
```

or

```
yarn add gramma -D
```

Then create the local config file:

```
npx gramma init
```

You will be asked if you want to integrate Gramma with Git (via hook). You can later manually toggle git hook via `npx gramma hook` command.

Git hook also works with a non-default hooks path (Husky, etc.).

<hr/>

<a id='installation-server'></a>

### Local LanguageTool server (optional)

For this to work, you have to install Java 1.8 or higher (you can find it [here](https://adoptium.net)). You can check if you have it installed already by running:

```
java -version
```

To install the local server, use:

```
gramma server install
```

That's it - Gramma will now use and manage the local server automatically.

<a id='usage'></a>

<div><img src="assets/divider.png" width="838" alt="---" class="divider" /></div>

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

<hr/>

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

<hr/>

<a id='usage-commit'></a>

### Git commit with grammar check

_**TIP:** Instead of the commands below, you can use [Git integration](#config-git)._

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

<hr/>

<a id='usage-options'></a>

### Command-line options

_Note: This section describes options for grammar-checking commands only. Other command-specific options are described in their specific sections of this document._

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

<hr/>

<a id='usage-vim'></a>

### Usage inside VIM

If you are a VIM/Neovim user, you can use Gramma directly inside the editor:

Print the potential mistakes:

```
:w !gramma check /dev/stdin -pn
```

Interactive fix of the current file:

```
:terminal gramma check %
```

It will open the interactive terminal inside VIM - to handle Gramma suggestions, enter the interactive mode (`a` or `i`) and use Gramma as usual. After you fix the mistakes and replace a file, press `Enter` to return to the editor.

<details>
  <summary style="outline: none; cursor: pointer">Example GIF (click to expand)</summary>
  <img src="https://raw.githubusercontent.com/caderek/gramma/master/docs/gramma-vim.gif" alt="Gramma VIM example" />
</details>

<a id='config'></a>

<div><img src="assets/divider.png" width="838" alt="---" class="divider" /></div>

## Configuration

<a id='config-intro'></a>

### Introduction

With Gramma, you can use a global and local configuration file. Gramma will use a proper config file following their priority:

1. Command-line options
2. Local config
3. Global config

Gramma will automatically generate a global configuration file on the first run.

You can check the path to the global configuration file (as well as other paths used by Gramma) via the following command:

```
gramma paths
```

You can change your settings by manually editing configuration files or running:

```
gramma config <setting> <value> [-g]
```

_Note: `-g` (`--global`) flag should be used when you want to alter the global config._

<hr/>

<a id='config-local'></a>

### Local config

You can initialize local config by running the following command in your project's root directory:

```
gramma init
```

Gramma creates the local configuration file in your working directory under `.gramma.json` name.

<hr/>

<a id='config-git'></a>

### Git integration

You can toggle Git hook via:

```
gramma hook
```

It will add/remove an entry in `commit-msg` hook.

Gramma follows the Git configuration file, so it should work with a non-standard hooks location.

<hr/>

<a id='config-checker'></a>

### Checker settings

#### Adding a word to the dictionary

Usually, you will add custom words to the local or global dictionary via interactive menu during the fix process, but you can also make it via separate command:

```
gramma config dictionary <your_word> [-g]
```

Examples:

```
gramma config dictionary aws
gramma config dictionary figma -g
```

#### Changing default language

```
gramma config language <language_code> [-g]
```

Examples:

```
gramma config language en-GB
gramma config language pl-PL -g
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
gramma config enable <rule_name> [-g]
```

Disabling a specific rule:

```
gramma config disable <rule_name> [-g]
```

Examples:

```
gramma config enable punctuation
gramma config enable casing -g

gramma config disable typography
gramma config disable style -g
```

<a id="available-rules"></a>

<details>
  <summary style="outline: none; cursor: pointer">Available rules (click to expand)</summary>
  <table>
    <tr><th>Rule</th><th>Description</th></tr>
    <tr><td><tt style="white-space: pre;">casing</tt></td><td>Rules about detecting uppercase words where lowercase is required and vice versa.</td></tr>
    <tr><td><tt style="white-space: pre;">colloquialisms</tt></td><td>Colloquial style.</td></tr>
    <tr><td><tt style="white-space: pre;">compounding</tt></td><td>Rules about spelling terms as one word or as as separate words.</td></tr>
    <tr><td><tt style="white-space: pre;">confused_words</tt></td><td>Words that are easily confused, like 'there' and 'their' in English.</td></tr>
    <tr><td><tt style="white-space: pre;">false_friends</tt></td><td>False friends: words easily confused by language learners because a similar word exists in their native language.</td></tr>
    <tr><td><tt style="white-space: pre;">gender_neutrality</tt></td><td>Helps to ensure gender-neutral terms.</td></tr>
    <tr><td><tt style="white-space: pre;">grammar</tt></td><td>Basic grammar check.</td></tr>
    <tr><td><tt style="white-space: pre;">misc</tt></td><td>Miscellaneous rules that don't fit elsewhere.</td></tr>
    <tr><td><tt style="white-space: pre;">punctuation</tt></td><td>Punctuation mistakes.</td></tr>
    <tr><td><tt style="white-space: pre;">redundancy</tt></td><td>Redundant words.</td></tr>
    <tr><td><tt style="white-space: pre;">regionalisms</tt></td><td>Regionalisms: words used only in another language variant or used with different meanings.</td></tr>
    <tr><td><tt style="white-space: pre;">repetitions</tt></td><td>Repeated words.</td></tr>
    <tr><td><tt style="white-space: pre;">semantics</tt></td><td>Logic, content, and consistency problems.</td></tr>
    <tr><td><tt style="white-space: pre;">style</tt></td><td>General style issues not covered by other categories, like overly verbose wording.</td></tr>
    <tr><td><tt style="white-space: pre;">typography</tt></td><td>Problems like incorrectly used dash or quote characters.</td></tr>
    <tr><td><tt style="white-space: pre;">typos</tt></td><td>Spelling issues.</td></tr>
  </table>
</details>

_Note: By default, all rules are enabled._

<hr/>

<a id='config-server'></a>

### Customizing API server

#### Defining custom API endpoint

If you want to use remote LanguageTool server, or use the one already installed in your system (not installed via `gramma server install`), you can define a custom API endpoint:

```
gramma config api_url <custom_api_endpoint> [-g]
```

Examples:

```
gramma config api_url https://my-custom-api-url.xyz/v2/check
gramma config api_url http://localhost:8081/v2/check -g
```

#### Running local server only when needed

If you do not want the local server to run all the time, you can configure Gramma to run it only when needed (`run → check → close`). It is useful when you run Gramma only from time to time and want to lower the memory consumption:

```
gramma config server_once true -g

```

Revert:

```
gramma config server_once false -g
```

#### Adding API key

If you use a paid option on [grammarbot.io](https://www.grammarbot.io/) or [languagetool.org](https://languagetool.org), you will receive an API key that you can use in Gramma:

```
gramma config api_key <your_api_key> [-g]
```

<hr/>

<a id='config-security'></a>

### Security

If you need to store some sensitive data in your local config file (API key etc.) you can use environment variables directly in the config file (supports `.env` files).

Example:

```json
{
  "api_url": "https://my-language-tool-api.com/v2/check",
  "api_key": "${MY_ENV_VARIABLE}",
  ...other_settings
}
```

_Note: The default API (`api.languagetool.org`) is generally [safe and does not store your texts](https://languagetool.org/pl/legal/privacy), but if you want to be extra careful, you should use a [local server](#installation-server) or custom API endpoint._

<a id='server'></a>

<div><img src="assets/divider.png" width="838" alt="---" class="divider" /></div>

## Managing a local server

If you have [configured a local server](#installation-server), Gramma will manage the server automatically - nevertheless, there might be situations when you want to manage the server manually. Gramma simplifies this by exposing basic server commands:

#### Starting the server

```
gramma server start
```

You can also specify a custom port:

```
gramma server start --port <port_number>
```

_Note: When you use this command, Gramma will ignore the `server_once` config option. This is expected behavior - I assume that if you use this command, you want the server to actually run, not stop after the first check._

#### Stopping the server

```
gramma server stop
```

#### Getting the server info

```
gramma server info
```

#### Getting the server PID

```
gramma server pid
```

_Note: You can use `gramma server info` instead - this command is kept to not break backward compatibility._

#### Opening the built-in GUI

```
gramma server gui
```

<a id='js'></a>

<div><img src="assets/divider.png" width="838" alt="---" class="divider" /></div>

## JS API

In addition to command-line usage, you can use two exposed methods if you want to handle mistakes by yourself.

#### Imports

If you use Node.js or a bundler for your browser build, you can use CommonJS or esm:

```js
const gramma = require("gramma")
```

```js
import gramma from "gramma"
```

If you don't use a bundler and want to use gramma in the browser, there are some prebuild packages in [/bundle](https://github.com/caderek/gramma/tree/master/bundle) directory:

- `gramma.esm.js` - ES Modules bundle
- `gramma.esm.min.js` - minified ES Modules bundle
- `gramma.min.js` - IIFE bundle exposing global `gramma` variable

You can also import ESM bundle directly from CDN:

```html
<script type="module">
  import gramma from "https://cdn.skypack.dev/gramma"
</script>
```

<hr/>

#### check() method

Returns a promise with a check result.

```js
const gramma = require("gramma")

gramma.check("Some text to check.").then(console.log)
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
  "api_url": "https://api.languagetool.org/v2/check",
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
const gramma = require("gramma")

gramma
  .check("Some text to check.", {
    api_url: "http://my-custom-language-tool-server.xyz/v2/check",
    api_key: "SOME_API_KEY",
    dictionary: ["npm", "gramma"],
    language: "pl-PL",
    rules: {
      typography: false,
      casing: false,
    },
  })
  .then(console.log)
```

<hr/>

#### replaceAll() method

Replace words with provided ones. It takes an array of objects in the following format:

```js
const exampleReplacements = [
  { offset: 6, length: 3, change: "correct phrase" },
  { offset: 20, length: 7, change: "another phrase" },
]
```

You can find proper `offset` and `length` values in the object returned by the `check()` method.

Example usage:

```js
const gramma = require("gramma")

/** Your custom function **/
const prepareReplacements = (matches) => {
  // your code...
}

const fix = async (text) => {
  const { matches } = await gramma.check(text)
  const replacements = prepareReplacements(matches)

  return gramma.replaceAll(text, replacements)
}

const main = () => {
  const correctText = await fix("Some text to check")
  console.log(correctText)
}

main()
```

<a id='license'></a>

<div><img src="assets/divider.png" width="838" alt="---" class="divider" /></div>

## License

The project is under open, non-restrictive [ISC license](https://github.com/caderek/gramma/blob/master/LICENSE.md).
