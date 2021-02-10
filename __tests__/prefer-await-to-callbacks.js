'use strict'

const rule = require('../rules/prefer-await-to-callbacks')
const RuleTester = require('eslint').RuleTester
const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 8,
  },
})

const message = 'Avoid callbacks. Prefer Async/Await.'

ruleTester.run('prefer-await-to-callbacks', rule, {
  valid: [
    'async function hi() { await thing().catch(err => console.log(err)) }',
    'async function hi() { await thing().then() }',
    'async function hi() { await thing().catch() }',
    'dbConn.on("error", err => { console.error(err) })',
    'dbConn.once("error", err => { console.error(err) })',
  ],

  invalid: [
    {
      code: 'heart(function(err) {})',
      errors: [{ message }],
    },
    {
      code: 'heart(err => {})',
      errors: [{ message }],
    },
    {
      code: 'heart("ball", function(err) {})',
      errors: [{ message }],
    },
    {
      code: 'function getData(id, callback) {}',
      errors: [{ message }],
    },
    {
      code: 'const getData = (cb) => {}',
      errors: [{ message }],
    },
    {
      code: 'var x = function (x, cb) {}',
      errors: [{ message }],
    },
    {
      code: 'cb()',
      errors: [{ message }],
    },
    {
      code: 'callback()',
      errors: [{ message }],
    },
  ],
})
