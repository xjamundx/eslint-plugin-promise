'use strict'

const rule = require('../rules/param-names')
const RuleTester = require('eslint').RuleTester
const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 6,
  },
})

const message = 'Promise constructor parameters must be named resolve, reject'

ruleTester.run('param-names', rule, {
  valid: [
    'new Promise(function(resolve, reject) {})',
    'new Promise(function(resolve, _reject) {})',
    'new Promise(function(_resolve, reject) {})',
    'new Promise(function(_resolve, _reject) {})',
    'new Promise(function(resolve) {})',
    'new Promise(function(_resolve) {})',
    'new Promise(resolve => {})',
    'new Promise((resolve, reject) => {})',
    'new Promise(() => {})',
    'new NonPromise()',
  ],

  invalid: [
    {
      code: 'new Promise(function(reject, resolve) {})',
      errors: [{ message }],
    },
    {
      code: 'new Promise(function(resolve, rej) {})',
      errors: [{ message }],
    },
    {
      code: 'new Promise(yes => {})',
      errors: [{ message }],
    },
    {
      code: 'new Promise((yes, no) => {})',
      errors: [{ message }],
    },
  ],
})
