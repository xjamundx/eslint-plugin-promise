# Prefer `async`/`await` to the callback pattern (prefer-await-to-callbacks)

`async` and `await` are clearer and easier to understand than using callbacks.

## Rule details

ES2017's `async` and `await` are easier and clearer ways to deal with
asynchronous code than the callback pattern.

Examples of **incorrect** code for this rule:

```js
cb()
callback()
doSomething(arg, err => {})
function doSomethingElse(cb) {}
```

Examples of **correct** code for this rule:

```js
await doSomething(arg)
async function doSomethingElse() {}
yield yieldValue(err => {})
eventEmitter.on('error', err => {})
```

## When Not To Use It

If you are not targeting an ES2017 or above environment and do not have a
shim for `async`/`await`, you should disable this rule.

## Further Reading

- [Making asynchronous programming easier with async and await on MDN](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Async_await)
