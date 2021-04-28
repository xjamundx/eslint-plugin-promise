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
    'heart(something => {})',
    'getErrors().map(error => responseTo(error))',
    'errors.filter(err => err.status === 402)',
    'errors.some(err => err.message.includes("Yo"))',
    'errors.every(err => err.status === 402)',
    'errors.filter(err => console.log(err))',
    'const error = errors.find(err => err.stack.includes("file.js"))',
    'this.myErrors.forEach(function(error) { log(error); })',
    'find(errors, function(err) { return  err.type === "CoolError" })',
    'map(errors, function(error) { return  err.type === "CoolError" })',
    '_.find(errors, function(error) { return  err.type === "CoolError" })',
    '_.map(errors, function(err) { return  err.type === "CoolError" })',
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
    {
      code: 'heart(error => {})',
      errors: [{ message }],
    },
    {
      code: `async.map(files, fs.stat, function(err, results) { if (err) throw err; });`,
      errors: [{ message }],
    },
    {
      code: `_.map(files, fs.stat, function(err, results) { if (err) throw err; });`,
      errors: [{ message }],
    },
    {
      code: `map(files, fs.stat, function(err, results) { if (err) throw err; });`,
      errors: [{ message }],
    },
    {
      code: `map(function(err, results) { if (err) throw err; });`,
      errors: [{ message }],
    },
    {
      code: `customMap(errors, (err) => err.message)`,
      errors: [{ message }],
    },
  ],
})
