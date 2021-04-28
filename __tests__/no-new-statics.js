'use strict'

const rule = require('../rules/no-new-statics')
const RuleTester = require('eslint').RuleTester
const ruleTester = new RuleTester()

ruleTester.run('no-new-statics', rule, {
  valid: [
    'Promise.resolve()',
    'Promise.reject()',
    'Promise.all()',
    'Promise.race()',
    'new Promise(function (resolve, reject) {})',
    'new SomeClass()',
    'SomeClass.resolve()',
    'new SomeClass.resolve()',
  ],
  invalid: [
    {
      code: 'new Promise.resolve()',
      output: 'Promise.resolve()',
      errors: [{ message: "Avoid calling 'new' on 'Promise.resolve()'" }],
    },
    {
      code: 'new Promise.reject()',
      output: 'Promise.reject()',
      errors: [{ message: "Avoid calling 'new' on 'Promise.reject()'" }],
    },
    {
      code: 'new Promise.all()',
      output: 'Promise.all()',
      errors: [{ message: "Avoid calling 'new' on 'Promise.all()'" }],
    },
    {
      code: 'new Promise.race()',
      output: 'Promise.race()',
      errors: [{ message: "Avoid calling 'new' on 'Promise.race()'" }],
    },
    {
      code: [
        'function foo() {',
        '  var a = getA()',
        '  return new Promise.resolve(a)',
        '}',
      ].join('\n'),
      output: [
        'function foo() {',
        '  var a = getA()',
        '  return Promise.resolve(a)',
        '}',
      ].join('\n'),
      errors: [{ message: "Avoid calling 'new' on 'Promise.resolve()'" }],
    },
  ],
})
