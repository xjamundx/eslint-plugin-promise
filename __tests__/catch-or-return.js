'use strict'

const rule = require('../rules/catch-or-return')
const RuleTester = require('eslint').RuleTester
const ruleTester = new RuleTester()

const catchMessage = 'Expected catch() or return'
const doneMessage = 'Expected done() or return'

ruleTester.run('catch-or-return', rule, {
  valid: [
    // catch
    'frank().then(go).catch(doIt)',
    'frank().then(go).then().then().then().catch(doIt)',
    'frank().then(go).then().catch(function() { /* why bother */ })',
    'frank.then(go).then(to).catch(jail)',
    'Promise.resolve(frank).catch(jail)',
    'Promise.resolve(frank)["catch"](jail)',
    'frank.then(to).finally(fn).catch(jail)',

    // arrow function use case
    {
      code:
        'postJSON("/smajobber/api/reportJob.json")\n\t.then(()=>this.setState())\n\t.catch(()=>this.setState())',
      parserOptions: { ecmaVersion: 6 },
    },

    // return
    'function a() { return frank().then(go) }',
    'function a() { return frank().then(go).then().then().then() }',
    'function a() { return frank().then(go).then()}',
    'function a() { return frank.then(go).then(to) }',

    // allowThen - .then(null, fn)
    {
      code: 'frank().then(go).then(null, doIt)',
      options: [{ allowThen: true }],
    },
    {
      code: 'frank().then(go).then().then().then().then(null, doIt)',
      options: [{ allowThen: true }],
    },
    {
      code:
        'frank().then(go).then().then(null, function() { /* why bother */ })',
      options: [{ allowThen: true }],
    },
    {
      code: 'frank.then(go).then(to).then(null, jail)',
      options: [{ allowThen: true }],
    },

    // allowThen - .then(null, fn)
    { code: 'frank().then(a, b)', options: [{ allowThen: true }] },
    {
      code: 'frank().then(a).then(b).then(null, c)',
      options: [{ allowThen: true }],
    },
    {
      code: 'frank().then(a).then(b).then(c, d)',
      options: [{ allowThen: true }],
    },
    {
      code: 'frank().then(a).then(b).then().then().then(null, doIt)',
      options: [{ allowThen: true }],
    },
    {
      code:
        'frank().then(a).then(b).then(null, function() { /* why bother */ })',
      options: [{ allowThen: true }],
    },

    // allowThen - .then(fn, fn)
    {
      code: 'frank().then(go).then(zam, doIt)',
      options: [{ allowThen: true }],
    },
    {
      code: 'frank().then(go).then().then().then().then(wham, doIt)',
      options: [{ allowThen: true }],
    },
    {
      code:
        'frank().then(go).then().then(function() {}, function() { /* why bother */ })',
      options: [{ allowThen: true }],
    },
    {
      code: 'frank.then(go).then(to).then(pewPew, jail)',
      options: [{ allowThen: true }],
    },

    // allowFinally - .finally(fn)
    {
      code: 'frank().then(go).catch(doIt).finally(fn)',
      options: [{ allowFinally: true }],
    },
    {
      code: 'frank().then(go).then().then().then().catch(doIt).finally(fn)',
      options: [{ allowFinally: true }],
    },
    {
      code:
        'frank().then(go).then().catch(function() { /* why bother */ }).finally(fn)',
      options: [{ allowFinally: true }],
    },

    // terminationMethod=done - .done(null, fn)
    {
      code: 'frank().then(go).done()',
      options: [{ terminationMethod: 'done' }],
    },

    // terminationMethod=[catch, done] - .done(null, fn)
    {
      code: 'frank().then(go).catch()',
      options: [{ terminationMethod: ['catch', 'done'] }],
    },
    {
      code: 'frank().then(go).done()',
      options: [{ terminationMethod: ['catch', 'done'] }],
    },
    {
      code: 'frank().then(go).finally()',
      options: [{ terminationMethod: ['catch', 'finally'] }],
    },

    // for coverage
    'nonPromiseExpressionStatement();',
  ],

  invalid: [
    // catch failures
    {
      code: 'function callPromise(promise, cb) { promise.then(cb) }',
      errors: [{ message: catchMessage }],
    },
    {
      code: 'fetch("http://www.yahoo.com").then(console.log.bind(console))',
      errors: [{ message: catchMessage }],
    },
    {
      code: 'a.then(function() { return "x"; }).then(function(y) { throw y; })',
      errors: [{ message: catchMessage }],
    },
    {
      code: 'Promise.resolve(frank)',
      errors: [{ message: catchMessage }],
    },
    {
      code: 'frank().then(to).catch(fn).then(foo)',
      errors: [{ message: catchMessage }],
    },
    {
      code: 'frank().finally(fn)',
      errors: [{ message: catchMessage }],
    },
    {
      code: 'frank().then(to).finally(fn)',
      errors: [{ message: catchMessage }],
    },
    {
      code: 'frank().then(go).catch(doIt).finally(fn)',
      errors: [{ message: catchMessage }],
    },
    {
      code: 'frank().then(go).then().then().then().catch(doIt).finally(fn)',
      errors: [{ message: catchMessage }],
    },
    {
      code:
        'frank().then(go).then().catch(function() { /* why bother */ }).finally(fn)',
      errors: [{ message: catchMessage }],
    },

    // return failures
    {
      code: 'function a() { frank().then(go) }',
      errors: [{ message: catchMessage }],
    },
    {
      code: 'function a() { frank().then(go).then().then().then() }',
      errors: [{ message: catchMessage }],
    },
    {
      code: 'function a() { frank().then(go).then()}',
      errors: [{ message: catchMessage }],
    },
    {
      code: 'function a() { frank.then(go).then(to) }',
      errors: [{ message: catchMessage }],
    },

    // allowFinally=true failures
    {
      code: 'frank().then(go).catch(doIt).finally(fn).then(foo)',
      options: [{ allowFinally: true }],
      errors: [{ message: catchMessage }],
    },
    {
      code: 'frank().then(go).catch(doIt).finally(fn).foobar(foo)',
      options: [{ allowFinally: true }],
      errors: [{ message: catchMessage }],
    },

    // terminationMethod=done - .done(null, fn)
    {
      code: 'frank().then(go)',
      options: [{ terminationMethod: 'done' }],
      errors: [{ message: doneMessage }],
    },
    {
      code: 'frank().catch(go)',
      options: [{ terminationMethod: 'done' }],
      errors: [{ message: doneMessage }],
    },

    // assume somePromise.ANYTHING() is a new promise
    {
      code: 'frank().catch(go).someOtherMethod()',
      errors: [{ message: catchMessage }],
    },
  ],
})
