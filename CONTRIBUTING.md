# Contributing to eslint-plugin-promise

:+1::tada: First off, thanks for taking the time to contribute! :tada::+1:

Please note that this project is released with a
[Contributor Code of Conduct](CODE_OF_CONDUCT.md). By participating in this
project, you agree to abide by its terms.

## Table of Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [How can I contribute?](#how-can-i-contribute)
  - [Improve documentation](#improve-documentation)
  - [Improve issues](#improve-issues)
  - [Give feedback on issues](#give-feedback-on-issues)
  - [Write code](#write-code)
- [Setup](#setup)
- [Submitting an issue](#submitting-an-issue)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## How can I contribute?

### Improve documentation

As a user of eslint-plugin-promise, you're the perfect candidate to help us
improve our documentation. Typo corrections, error fixes, better explanations,
more examples, etc. Open issues for things that could be improved. Anything.
Even improvements to this document.

### Improve issues

Some issues are created with missing information, not reproducible, or plain
invalid. Help make them easier to resolve.

### Give feedback on issues

We're always looking for more opinions on discussions in the issue tracker. It's
a good opportunity to influence the future direction of this tool.

The
[`question` label](https://github.com/xjamundx/eslint-plugin-promise/labels/question)
is a good place to find ongoing discussions.

### Write code

You can use issue labels to discover issues you could help out with:

- [`bug` issues](https://github.com/xjamundx/eslint-plugin-promise/labels/bug)
  are known bugs we'd like to fix
- [`enhancement` issues](https://github.com/xjamundx/eslint-plugin-promise/labels/enhancement)
  are features we're open to including

The
[`help wanted`](https://github.com/xjamundx/eslint-plugin-promise/labels/help%20wanted)
and
[`good first issue`](https://github.com/xjamundx/eslint-plugin-promise/labels/good%20first%20issue)
labels are especially useful.

You may find an issue is assigned. Please double-check before starting on this
issue because somebody else is likely already working on it.

## Setup

When developing, prefer using Node ≥8 and npm ≥5. While this plugin supports
Node 4, writing code with the latest stable Node and npm versions allows us to
use newer developer tools.

After
[cloning the repository](https://help.github.com/articles/cloning-a-repository/),
run `npm install` to install dependencies.

Run `npm test` to run the test suite (powered by
[Jest](https://facebook.github.io/jest/)). Sometimes it can be helpful to run a
single test file and watch for changes, especially when working on a single
rule. You can run `npm test -- --watch` to achieve this.

Run `npm run lint` to lint the codebase. If there are any errors reported, try
running `npm run lint -- --fix` first to see if ESLint can fix them for you.
`npm test` will also lint the codebase thanks to
[jest-runner-eslint](https://github.com/jest-community/jest-runner-eslint).

This codebase uses [Prettier](http://prettier.io/) for code formatting. Consider
installing an [editor plugin](https://prettier.io/docs/en/editors.html) for the
best experience, but code will also be formatted with a precommit script (using
[lint-staged](https://github.com/okonet/lint-staged)) as well as by running
`npm run lint -- --fix`.

## Submitting an issue

- Please search the issue tracker before opening an issue.
- Use a clear and descriptive title.
- Include as much information as possible by filling out the provided issue
  template.
- The more time you put into an issue, the more we will.
- [The best issue report is a failing test proving it.](https://twitter.com/sindresorhus/status/579306280495357953)
