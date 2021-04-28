# Enforces the use of `catch()` on un-returned promises (catch-or-return)

Ensure that each time a `then()` is applied to a promise, a `catch()` is applied
as well. Exceptions are made if you are returning that promise.

## Rule Details

If a promise is not handled correctly, any error from that promise can cause
unhandled promise rejections. A promise can be handled using `catch()` or
returning it from a function, which will mean that it's the caller's
responsibility to handle the promise.

Examples of **incorrect** code for this rule:

```js
myPromise.then(doSomething)
myPromise.then(doSomething, handleErrors) // catch() may be a little better
```

Examples of **correct** code for this rule:

```js
myPromise.then(doSomething).catch(handleErrors)
myPromise
  .then(doSomething)
  .then(doSomethingElse)
  .catch(handleErrors)
function doSomethingElse() {
  return myPromise.then(doSomething)
}
```

## Options

### `allowThen`

The second argument to `then()` can also be used to handle a promise rejection,
but it won't catch any errors from the first argument callback. Because of this,
this rule reports usage of `then()` with two arguments without `catch()` by
default.

However, you can use `{ allowThen: true }` to allow using `then()` with two
arguments instead of `catch()` to handle promise rejections.

Examples of **incorrect** code for the default `{ allowThen: false }` option:

```js
myPromise.then(doSomething, handleErrors)
```

Examples of **correct** code for the `{ allowThen: true }` option:

```js
myPromise.then(doSomething, handleErrors)
myPromise.then(doSomething).catch(handleErrors)
```

### `allowFinally`

This option allows `.finally()` to be used after `catch()` at the end of the
promise chain. This is different from adding `'finally'` as a
`terminationMethod` because it will still require the Promise chain to be
"caught" beforehand.

Examples of **incorrect** code for the default `{ allowFinally: false }` option:

```js
myPromise
  .then(doSomething)
  .catch(handleErrors)
  .finally(cleanUp)
```

Examples of **correct** code for the `{ allowFinally: true }` option:

```js
myPromise
  .then(doSomething)
  .catch(handleErrors)
  .finally(cleanUp)
```

### `terminationMethod`

This option allows for specifying different method names to allow instead of
`catch()` at the end of the promise chain. This is
useful for many non-standard Promise implementations. You can use a single
string or an array of strings.

Examples of **incorrect** code for the `{ terminationMethod: 'done' }` option:

```js
myPromise.then(doSomething).catch(handleErrors)
```

Examples of **correct** code for the `{ terminationMethod: 'done' }` option:

```js
myPromise.then(doSomething).done(handleErrors)
```

Examples of **correct** code for the
`{ terminationMethod: ['catch', 'asCallback', 'finally'] }` option:

```js
myPromise.then(doSomething).catch(handleErrors)
myPromise.then(doSomething).asCallback(handleErrors)
myPromise.then(doSomething).finally(handleErrors)
```

## When Not To Use It

If you do not want to be notified about not handling promises by `catch`ing or
`return`ing, such as if you have a custom `unhandledRejection`
(`unhandledrejection` in the browser) handler, you can safely disable this rule.

## Further Reading

- [We have a problem with promises](http://pouchdb.com/2015/05/18/we-have-a-problem-with-promises.html)
  (Advanced mistake #2: `then(resolveHandler).catch(rejectHandler)` isn't
  exactly the same as `then(resolveHandler, rejectHandler)`)
