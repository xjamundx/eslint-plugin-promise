'use strict'

const rule = require('../rules/no-promise-in-callback')
const RuleTester = require('eslint').RuleTester
const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 6,
  },
})

const errorMessage = 'Avoid using promises inside of callbacks.'

ruleTester.run('no-promise-in-callback', rule, {
  valid: [
    'go(function() { return Promise.resolve(4) })',
    'go(function() { return a.then(b) })',
    'go(function() { b.catch(c) })',
    'go(function() { b.then(c, d) })',

    // arrow functions and other things
    'go(() => Promise.resolve(4))',
    'go((errrr) => a.then(b))',
    'go((elpers) => { b.catch(c) })',
    'go((e) => { b.then(c, d) })',

    // within promises it won't complain
    'a.catch((err) => { b.then(c, d) })',

    // random unrelated things
    'var x = function() { return Promise.resolve(4) }',
    'function y() { return Promise.resolve(4) }',
    'function then() { return Promise.reject() }',
    'doThing(function(x) { return Promise.reject(x) })',
    'doThing().then(function() { return Promise.all([a,b,c]) })',
    'doThing().then(function() { return Promise.resolve(4) })',
    'doThing().then(() => Promise.resolve(4))',
    'doThing().then(() => Promise.all([a]))',

    // weird case, we assume it's not a big deal if you return (even though you may be cheating)
    'a(function(err) { return doThing().then(a) })',
  ],

  invalid: [
    {
      code: 'a(function(err) { doThing().then(a) })',
      errors: [{ message: errorMessage }],
    },
    {
      code: 'a(function(error, zup, supa) { doThing().then(a) })',
      errors: [{ message: errorMessage }],
    },
    {
      code: 'a(function(error) { doThing().then(a) })',
      errors: [{ message: errorMessage }],
    },

    // arrow function
    {
      code: 'a((error) => { doThing().then(a) })',
      errors: [{ message: errorMessage }],
    },
    {
      code: 'a((error) => doThing().then(a))',
      errors: [{ message: errorMessage }],
    },
    {
      code: 'a((err, data) => { doThing().then(a) })',
      errors: [{ message: errorMessage }],
    },
    {
      code: 'a((err, data) => doThing().then(a))',
      errors: [{ message: errorMessage }],
    },

    // function decl. and similar (why not)
    {
      code: 'function x(err) { Promise.all() }',
      errors: [{ message: errorMessage }],
    },
    {
      code: 'let x = (err) => doThingWith(err).then(a)',
      errors: [{ message: errorMessage }],
    },
  ],
})
