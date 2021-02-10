'use strict'

const RuleTester = require('eslint').RuleTester
const rule = require('../rules/no-return-in-finally')
const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 6,
  },
})

const message = 'No return in finally'

ruleTester.run('no-return-in-finally', rule, {
  valid: [
    'Promise.resolve(1).finally(() => { console.log(2) })',
    'Promise.reject(4).finally(() => { console.log(2) })',
    'Promise.reject(4).finally(() => {})',
    'myPromise.finally(() => {});',
    'Promise.resolve(1).finally(function () { })',
  ],
  invalid: [
    {
      code: 'Promise.resolve(1).finally(() => { return 2 })',
      errors: [{ message }],
    },
    {
      code: 'Promise.reject(0).finally(() => { return 2 })',
      errors: [{ message }],
    },
    {
      code: 'myPromise.finally(() => { return 2 });',
      errors: [{ message }],
    },
    {
      code: 'Promise.resolve(1).finally(function () { return 2 })',
      errors: [{ message }],
    },
  ],
})
