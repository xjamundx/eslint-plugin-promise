'use strict'

const rule = require('../rules/avoid-new')
const RuleTester = require('eslint').RuleTester
const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 6,
  },
})

const errorMessage = 'Avoid creating new promises.'

ruleTester.run('avoid-new', rule, {
  valid: [
    'Promise.resolve()',
    'Promise.reject()',
    'Promise.all()',
    'new Horse()',
    'new PromiseLikeThing()',
    'new Promise.resolve()',
  ],

  invalid: [
    {
      code: 'var x = new Promise(function (x, y) {})',
      errors: [{ message: errorMessage }],
    },
    {
      code: 'new Promise()',
      errors: [{ message: errorMessage }],
    },
    {
      code: 'Thing(new Promise(() => {}))',
      errors: [{ message: errorMessage }],
    },
  ],
})
