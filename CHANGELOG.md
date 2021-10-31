# CHANGELOG

## 1.0.0

First stable release.

## 1.1.0

- Added Git hook integration
- Updated dependencies and documentation
- Improved error handling

## 1.2.0

- Added Markdown support
- Used api.languagetool.org as the default API

## 1.3.0

- Support for environment variables in config files
- Local config works in subdirectories
- Automatic markdown support for .md files
- Better error handling
- Improved documentation

## 1.4.0

- Automatically include changes to .gramma.json when executing Git hook
- Standalone binaries migrated to Node 16

## 1.4.1

- Fixed JS API, added type definitions
- Fixed hooks behavior with commit --verbose flag

## 1.4.2 - 1.4.4

- Isomorphic JS API (works on browser)

## 1.4.5

- Fixed CORS in JS API (browser)

## 1.4.6 - 1.4.7

- Bundles (esm, esm-min, iife)

## 1.4.8

- Fixed links in README

## 1.5.0

- When local server is installed but not running, Gramma will now try to use command-line interface for LanguageTool communication instead of spawning HTTP server (if possible).
- Gramma will now automatically check for updates once a day.
- Added validation for languages and rules parameters.

## 1.6.0

- Added `gramma server info` command.
- Added option to set custom port when managing local server manually.
