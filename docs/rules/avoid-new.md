# Avoid creating `new` promises outside of utility libs (use [pify][] instead) (avoid-new)

Avoid using `new Promise` in favour of utility libraries or
`Promise.resolve`/`reject`.

## Rule Details

Creating promises using `new Promise` can be used to promisify Node-style
callbacks. However, you can use libraries such as [pify][] or Node's
[`util.promisify`](https://nodejs.org/api/util.html#util_util_promisify_original)
instead.

`new Promise` is also sometimes misused to wrap a value or
error into a promise. However, this can be done more concisely and clearly with
`Promise.resolve` and `Promise.reject`.

Examples of **incorrect** code for this rule:

```js
function promisifiedFn(arg) {
  return new Promise((resolve, reject) => {
    callbackStyleFn(arg, (error, result) => error ? reject(error) : resolve(result))
  })
}

new Promise((resolve, reject) => resolve(1))
new Promise((resolve, reject) => reject(new Error('oops')))
```

Examples of **correct** code for this rule:

```js
const pify = require('pify')
const promisifiedFn = pify(callbackStyleFn)

Promise.resolve(1)
Promise.reject(new Error('oops'))
```

## When Not To Use It

If you are creating a utility library like pify or do not want to be notified
when using `new Promise`, you can safely disable this rule.

[pify]: https://www.npmjs.com/package/pify
