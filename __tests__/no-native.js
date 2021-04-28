'use strict'

const rule = require('../rules/no-native')
const RuleTester = require('eslint').RuleTester
const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
  },
})

ruleTester.run('no-native', rule, {
  valid: [
    'var Promise = null; function x() { return Promise.resolve("hi"); }',
    'var Promise = window.Promise || require("bluebird"); var x = Promise.reject();',
    'import Promise from "bluebird"; var x = Promise.reject();',
  ],

  invalid: [
    {
      code: 'new Promise(function(reject, resolve) { })',
      errors: [{ message: '"Promise" is not defined.' }],
    },
    {
      code: 'Promise.resolve()',
      errors: [{ message: '"Promise" is not defined.' }],
    },
    {
      code: 'new Promise(function(reject, resolve) { })',
      errors: [{ message: '"Promise" is not defined.' }],
      env: { browser: true },
    },
    {
      code: 'new Promise(function(reject, resolve) { })',
      errors: [{ message: '"Promise" is not defined.' }],
      env: { node: true },
    },
    {
      code: 'Promise.resolve()',
      errors: [{ message: '"Promise" is not defined.' }],
      env: { es6: true },
    },
    {
      code: 'Promise.resolve()',
      errors: [{ message: '"Promise" is not defined.' }],
      globals: { Promise: true },
    },
  ],
})
