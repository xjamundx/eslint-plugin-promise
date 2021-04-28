# Avoid wrapping values in `Promise.resolve` or `Promise.reject` when not needed (no-return-wrap)

Ensure that inside a `then()` or a `catch()` we always `return` or `throw` a raw
value instead of wrapping in `Promise.resolve` or `Promise.reject`.

## Rule Details

Returning a value wrapped in `Promise.resolve` or `Promise.reject` inside a
`then()` or `catch()` callback is unnecessary. Returning a non-promise in one of
these callbacks automatically wraps it into a promise, and `throw`ing an error
is the same as using `Promise.reject`.

Examples of **incorrect** code for this rule:

```js
myPromise.then(function(val) {
  return Promise.resolve(val * 2)
})

myPromise.then(function(val) {
  return Promise.reject('bad thing')
})
```

Examples of **correct** code for this rule:

```js
myPromise.then(function(val) {
  return val * 2
})

myPromise.then(function(val) {
  throw 'bad thing'
})
```

## Options

### `allowReject`

Using `{ allowReject: true }` permits wrapping returned values with
`Promise.reject`, such as when you would use it as another way to reject the
promise.

Examples of **correct** code for the `{ allowReject: true }` option:

```js
myPromise.then(function(val) {
  return Promise.reject('bad thing')
})
```

## When Not To Use It

If you don't want to be notified when returning values wrapped in
`Promise.resolve` or `Promise.reject` in `then()` or `catch()` callbacks, you
can safely disable this rule.
