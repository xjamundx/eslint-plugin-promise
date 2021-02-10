'use strict'

const rule = require('../rules/always-return')
const RuleTester = require('eslint').RuleTester
const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 6,
  },
})

const message = 'Each then() should return a value or throw'

ruleTester.run('always-return', rule, {
  valid: [
    'hey.then(x => x)',
    'hey.then(x => ({}))',
    'hey.then(x => { return; })',
    'hey.then(x => { return x ? x.id : null })',
    'hey.then(x => { return x * 10 })',
    'hey.then(function() { return 42; })',
    'hey.then(function() { return new Promise(); })',
    'hey.then(function() { return "x"; }).then(doSomethingWicked)',
    'hey.then(x => x).then(function() { return "3" })',
    'hey.then(function() { throw new Error("msg"); })',
    'hey.then(function(x) { if (!x) { throw new Error("no x"); } return x; })',
    'hey.then(function(x) { if (x) { return x; } throw new Error("no x"); })',
    'hey.then(x => { throw new Error("msg"); })',
    'hey.then(x => { if (!x) { throw new Error("no x"); } return x; })',
    'hey.then(x => { if (x) { return x; } throw new Error("no x"); })',
    'hey.then(x => { var f = function() { }; return f; })',
    'hey.then(x => { if (x) { return x; } else { return x; } })',
    'hey.then(x => { return x; var y = "unreachable"; })',
    'hey.then(x => { return x; return "unreachable"; })',
    'hey.then(x => { return; }, err=>{ log(err); })',
    'hey.then(x => { return x && x(); }, err=>{ log(err); })',
    'hey.then(x => { return x.y || x(); }, err=>{ log(err); })',
    `hey.then(x => {
        return anotherFunc({
          nested: {
            one: x === 1 ? 1 : 0,
            two: x === 2 ? 1 : 0
          }
        })
      })`,
  ],

  invalid: [
    {
      code: 'hey.then(x => {})',
      errors: [{ message }],
    },
    {
      code: 'hey.then(function() { })',
      errors: [{ message }],
    },
    {
      code: 'hey.then(function() { }).then(x)',
      errors: [{ message }],
    },
    {
      code: 'hey.then(function() { }).then(function() { })',
      errors: [{ message }, { message }],
    },
    {
      code: 'hey.then(function() { return; }).then(function() { })',
      errors: [{ message }],
    },
    {
      code: 'hey.then(function() { doSomethingWicked(); })',
      errors: [{ message }],
    },
    {
      code: 'hey.then(function() { if (x) { return x; } })',
      errors: [{ message }],
    },
    {
      code: 'hey.then(function() { if (x) { return x; } else { }})',
      errors: [{ message }],
    },
    {
      code: 'hey.then(function() { if (x) { } else { return x; }})',
      errors: [{ message }],
    },
    {
      code:
        'hey.then(function() { if (x) { return you.then(function() { return x; }); } })',
      errors: [{ message }],
    },
    {
      code: 'hey.then( x => { x ? x.id : null })',
      errors: [{ message }],
    },
    {
      code: 'hey.then(function(x) { x ? x.id : null })',
      errors: [{ message }],
    },
    {
      code: `(function() {
        return hey.then(x => {
          anotherFunc({
            nested: {
              one: x === 1 ? 1 : 0,
              two: x === 2 ? 1 : 0
            }
          })
        })
      })()`,
      errors: [{ message }],
    },
  ],
})
