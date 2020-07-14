# Avoid calling `cb()` inside of a `then()` or `catch()` (use [nodeify][] instead) (no-callback-in-promise)

Avoid using a callback function inside of a `then()` handler in favour of
utility libraries.

## Rule Details

Using a callback function inside `then()` or `catch()` can be used to convert a
promise-returning function into a callback-style function. However, libraries
such as [nodeify][] can be used instead.

Examples of **incorrect** code for this rule:

```js
function callbackStyleFn(param, cb) {
  return promiseFn(param)
    .then(result => cb(null, result))
    .catch(cb)
}
```

Examples of **correct** code for this rule:

```js
const nodeify = require('nodeify')
function callbackStyleFn(param, cb) {
  return nodeify(promiseFn(param), cb)
}
```

## When Not To Use It

If you do not want to be notified about not calling a callback function inside
of `then()` or `catch()`, you can safely disable this rule.

[nodeify]: https://www.npmjs.com/package/nodeify
