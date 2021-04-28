'use strict'

const rule = require('../rules/no-callback-in-promise')
const RuleTester = require('eslint').RuleTester
const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 6,
  },
})

const errorMessage = 'Avoid calling back inside of a promise.'

ruleTester.run('no-callback-in-promise', rule, {
  valid: [
    'function thing(cb) { cb() }',
    'doSomething(function(err) { cb(err) })',
    'function thing(callback) { callback() }',
    'doSomething(function(err) { callback(err) })',

    // arrow functions and other things
    'let thing = (cb) => cb()',
    'doSomething(err => cb(err))',

    // exceptions test
    {
      code: 'a.then(() => next())',
      options: [{ exceptions: ['next'] }],
    },
  ],

  invalid: [
    {
      code: 'a.then(cb)',
      errors: [{ message: errorMessage, column: 8 }],
    },
    {
      code: 'a.then(() => cb())',
      errors: [{ message: errorMessage }],
    },
    {
      code: 'a.then(function(err) { cb(err) })',
      errors: [{ message: errorMessage, column: 24 }],
    },
    {
      code: 'a.then(function(data) { cb(data) }, function(err) { cb(err) })',
      errors: [
        { column: 25, message: errorMessage },
        { column: 53, message: errorMessage },
      ],
    },
    {
      code: 'a.catch(function(err) { cb(err) })',
      errors: [{ message: errorMessage }],
    },

    // callback should also complain
    {
      code: 'a.then(callback)',
      errors: [{ message: errorMessage, column: 8 }],
    },
    {
      code: 'a.then(() => callback())',
      errors: [{ message: errorMessage }],
    },
    {
      code: 'a.then(function(err) { callback(err) })',
      errors: [{ message: errorMessage, column: 24 }],
    },
    {
      code:
        'a.then(function(data) { callback(data) }, function(err) { callback(err) })',
      errors: [
        { message: errorMessage },
        { column: 59, message: errorMessage },
      ],
    },
    {
      code: 'a.catch(function(err) { callback(err) })',
      errors: [{ message: errorMessage }],
    },
  ],
})
