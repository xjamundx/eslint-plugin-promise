'use strict'
const rule = require('../rules/no-identity-handlers')
const { RuleTester } = require('eslint')
const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 6
  }
})
ruleTester.run('no-identity-handlers', rule, {
  valid: [
    'Promise.resolve(2).then(value => value * 2)',
    'Promise.resolve(2).then(value => { return value + 1 })',
    'Promise.resolve(2).then(() => null)',
    'Promise.resolve(2).then(() => doSomethingTotallyDifferent())',
    'somePromise().then(value => doSomethingWith(value))',
    'somePromise().then(handler)',
    'Promise.reject(Error()).catch(err => { console.error(err); throw err; })',
    'Promise.reject(Error()).catch(err => { throw doSomethingTo(err) })',
    'somePromise().catch(handler)',
    'somePromise().catch(createHandler())',
    'somePromise().then(value => value * 2, err => { console.error(err); throw err; })',
    'somePromise().then(func, func)',
    'getObject().then(({ a, b, c }) => ({ a, b, c: c, d: calculate(a, b, c) }))',
    'getObject().then(({ a: rename, b, c }) => ({ rename, b, c }))',
    'getObject().then(({ a, b, c }) => { return { a, b: c, c: b } })',
    'getArray().then(([a, b]) => [a, b, ...getSomeOtherArray()])',
    'getArray().then(([a, b]) => [b, a])',
    // edge cases that aren't really valid but shouldn't throw or report
    'Promise.resolve(2).then()',
    'Promise.reject(Error()).catch()'
  ],
  invalid: [
    {
      code: 'Promise.resolve(2).then(_ => _)',
      errors: [{ message: 'No identity handlers' }]
    },
    {
      code: 'Promise.resolve(2).then(val => { return val })',
      errors: [{ message: 'No identity handlers' }]
    },
    {
      code: 'Promise.resolve(2).then(function (value) { return value })',
      errors: [{ message: 'No identity handlers' }]
    },
    {
      code: 'getObject().then(({ a, b, c }) => ({ a, b, c }))',
      errors: [{ message: 'No identity handlers' }]
    },
    {
      code: 'getObject().then(({ a, b, c }) => { return { a, b, c } })',
      errors: [{ message: 'No identity handlers' }]
    },
    {
      code: 'getArray().then(([a, b]) => [a, b])',
      errors: [{ message: 'No identity handlers' }]
    },
    {
      code: 'getArray().then(([a, b]) => { return [a, b] })',
      errors: [{ message: 'No identity handlers' }]
    },
    {
      code: 'Promise.reject(Error()).catch(err => { throw err })',
      errors: [{ message: 'No identity handlers' }]
    },
    {
      code: 'Promise.reject(Error()).catch(function (e) { throw e })',
      errors: [{ message: 'No identity handlers' }]
    },
    {
      code: 'Promise.reject(Error()).then(null, error => { throw error })',
      errors: [{ message: 'No identity handlers' }]
    },
    {
      code: 'Promise.reject(Error()).then(null, function (e) { throw e })',
      errors: [{ message: 'No identity handlers' }]
    }
  ]
})
