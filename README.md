<h1 align="center">Gramma - command line grammar checker</h1>
<div align="center">
<img src="https://img.shields.io/npm/v/gramma.svg" alt="npm version">
<img src="https://img.shields.io/npm/l/gramma.svg" alt="npm license">
<img src="https://img.shields.io/github/languages/code-size/caderek/gramma.svg" alt="GitHub code size in bytes">
<img src="https://img.shields.io/node/v/gramma.svg" alt="node version">
<img src="https://img.shields.io/npm/dw/gramma.svg" alt="npm downloads per week">
<a href="https://discord.gg/6RjmNx6" target="_blank"><img src="https://img.shields.io/discord/602308081279303692.svg" alt="discord"></a>

<a href="https://circleci.com/gh/caderek/gramma/tree/master" target="_blank"><img src="https://img.shields.io/circleci/build/github/caderek/gramma.svg" alt="CircleCI"></a>
<a href="https://www.codacy.com/app/caderek/gramma?utm_source=github.com&utm_medium=referral&utm_content=caderek/gramma&utm_campaign=Badge_Grade" target="_blank"><img src="https://img.shields.io/codacy/grade/47a1c8bb12644bd6a0303d642db1cdae.svg" alt="Codacy grade"></a>
<a href="https://www.codacy.com/app/caderek/gramma?utm_source=github.com&utm_medium=referral&utm_content=caderek/gramma&utm_campaign=Badge_Coverage" target="_blank"><img src="https://img.shields.io/codacy/coverage/47a1c8bb12644bd6a0303d642db1cdae.svg" alt="Codacy coverage"></a>
<img src="https://img.shields.io/david/caderek/gramma.svg" alt="dependencies status">
<img src="https://img.shields.io/github/issues-raw/caderek/gramma.svg" alt="Github issues">
<img src="https://img.shields.io/github/last-commit/caderek/gramma.svg" alt="Github last commit">

</div>

## Notes

This package is in a POC stage. It's functional, but limited and not unit tested.

## Installation

`npm i gramma -g`

## Usage

### Print possible mistakes for a file

`gramma check [file]`

### Print possible mistakes for a string

`gramma listen [text]`

Text should be quoted.

### Example output

![example output](docs/example.png)

### License

Projects is under open, non-restrictive [ISC license](LICENSE)
