'use strict'

const rule = require('../rules/valid-params')
const RuleTester = require('eslint').RuleTester
const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 6,
  },
})

ruleTester.run('valid-params', rule, {
  valid: [
    // valid Promise.resolve()
    'Promise.resolve()',
    'Promise.resolve(1)',
    'Promise.resolve({})',
    'Promise.resolve(referenceToSomething)',

    // valid Promise.reject()
    'Promise.reject()',
    'Promise.reject(1)',
    'Promise.reject({})',
    'Promise.reject(referenceToSomething)',
    'Promise.reject(Error())',

    // valid Promise.race()
    'Promise.race([])',
    'Promise.race(iterable)',
    'Promise.race([one, two, three])',

    // valid Promise.all()
    'Promise.all([])',
    'Promise.all(iterable)',
    'Promise.all([one, two, three])',

    // valid Promise.then()
    'somePromise().then(success)',
    'somePromise().then(success, failure)',
    'promiseReference.then(() => {})',
    'promiseReference.then(() => {}, () => {})',

    // valid Promise.catch()
    'somePromise().catch(callback)',
    'somePromise().catch(err => {})',
    'promiseReference.catch(callback)',
    'promiseReference.catch(err => {})',

    // valid Promise.finally()
    'somePromise().finally(callback)',
    'somePromise().finally(() => {})',
    'promiseReference.finally(callback)',
    'promiseReference.finally(() => {})',

    // integration test
    [
      'Promise.all([',
      '  Promise.resolve(1),',
      '  Promise.resolve(2),',
      '  Promise.reject(Error()),',
      '])',
      '  .then(console.log)',
      '  .catch(console.error)',
      '  .finally(console.log)',
    ].join('\n'),
  ],
  invalid: [
    // invalid Promise.resolve()
    {
      code: 'Promise.resolve(1, 2)',
      errors: [
        {
          message:
            'Promise.resolve() requires 0 or 1 arguments, but received 2',
        },
      ],
    },
    {
      code: 'Promise.resolve({}, function() {}, 1, 2, 3)',
      errors: [
        {
          message:
            'Promise.resolve() requires 0 or 1 arguments, but received 5',
        },
      ],
    },

    // invalid Promise.reject()
    {
      code: 'Promise.reject(1, 2, 3)',
      errors: [
        {
          message: 'Promise.reject() requires 0 or 1 arguments, but received 3',
        },
      ],
    },
    {
      code: 'Promise.reject({}, function() {}, 1, 2)',
      errors: [
        {
          message: 'Promise.reject() requires 0 or 1 arguments, but received 4',
        },
      ],
    },

    // invalid Promise.race()
    {
      code: 'Promise.race(1, 2)',
      errors: [
        { message: 'Promise.race() requires 1 argument, but received 2' },
      ],
    },
    {
      code: 'Promise.race({}, function() {}, 1, 2, 3)',
      errors: [
        { message: 'Promise.race() requires 1 argument, but received 5' },
      ],
    },

    // invalid Promise.all()
    {
      code: 'Promise.all(1, 2, 3)',
      errors: [
        { message: 'Promise.all() requires 1 argument, but received 3' },
      ],
    },
    {
      code: 'Promise.all({}, function() {}, 1, 2)',
      errors: [
        { message: 'Promise.all() requires 1 argument, but received 4' },
      ],
    },

    // invalid Promise.then()
    {
      code: 'somePromise().then()',
      errors: [
        { message: 'Promise.then() requires 1 or 2 arguments, but received 0' },
      ],
    },
    {
      code: 'somePromise().then(() => {}, () => {}, () => {})',
      errors: [
        { message: 'Promise.then() requires 1 or 2 arguments, but received 3' },
      ],
    },
    {
      code: 'promiseReference.then()',
      errors: [
        { message: 'Promise.then() requires 1 or 2 arguments, but received 0' },
      ],
    },
    {
      code: 'promiseReference.then(() => {}, () => {}, () => {})',
      errors: [
        { message: 'Promise.then() requires 1 or 2 arguments, but received 3' },
      ],
    },

    // invalid Promise.catch()
    {
      code: 'somePromise().catch()',
      errors: [
        { message: 'Promise.catch() requires 1 argument, but received 0' },
      ],
    },
    {
      code: 'somePromise().catch(() => {}, () => {})',
      errors: [
        { message: 'Promise.catch() requires 1 argument, but received 2' },
      ],
    },
    {
      code: 'promiseReference.catch()',
      errors: [
        { message: 'Promise.catch() requires 1 argument, but received 0' },
      ],
    },
    {
      code: 'promiseReference.catch(() => {}, () => {})',
      errors: [
        { message: 'Promise.catch() requires 1 argument, but received 2' },
      ],
    },

    // invalid Promise.finally()
    {
      code: 'somePromise().finally()',
      errors: [
        { message: 'Promise.finally() requires 1 argument, but received 0' },
      ],
    },
    {
      code: 'somePromise().finally(() => {}, () => {})',
      errors: [
        { message: 'Promise.finally() requires 1 argument, but received 2' },
      ],
    },
    {
      code: 'promiseReference.finally()',
      errors: [
        { message: 'Promise.finally() requires 1 argument, but received 0' },
      ],
    },
    {
      code: 'promiseReference.finally(() => {}, () => {})',
      errors: [
        { message: 'Promise.finally() requires 1 argument, but received 2' },
      ],
    },
  ],
})
