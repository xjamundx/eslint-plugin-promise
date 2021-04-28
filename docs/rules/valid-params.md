# Ensures the proper number of arguments are passed to Promise functions (valid-params)

Calling a Promise function with the incorrect number of arguments can lead to
unexpected behavior or hard to spot bugs.

## Rule Details

This rule is aimed at flagging instances where a Promise function is called with
the improper number of arguments.

Examples of **incorrect** code for this rule:

- `Promise.all()` is called with 0 or 2+ arguments
- `Promise.race()` is called with 0 or 2+ arguments
- `Promise.resolve()` is called with 2+ arguments
- `Promise.reject()` is called with 2+ arguments
- `Promise.then()` is called with 0 or 3+ arguments
- `Promise.catch()` is called with 0 or 2+ arguments
- `Promise.finally()` is called with 0 or 2+ arguments

Examples of **correct** code for this rule:

```js
// Promise.all() requires 1 argument
Promise.all([p1, p2, p3])
Promise.all(iterable)

// Promise.race() requires 1 argument
Promise.race([p1, p2, p3])
Promise.race(iterable)

// Promise.resolve() requires 0 or 1 arguments
Promise.resolve()
Promise.resolve({})
Promise.resolve([1, 2, 3])
Promise.resolve(referenceToObject)

// Promise.reject() requires 0 or 1 arguments
Promise.reject()
Promise.reject(Error())
Promise.reject(referenceToError)

// Promise.then() requires 1 or 2 arguments
somePromise().then(value => doSomething(value))
somePromise().then(successCallback, errorCallback)

// Promise.catch() requires 1 argument
somePromise().catch(error => {
  handleError(error)
})
somePromise().catch(console.error)

// Promise.finally() requires 1 argument
somePromise().finally(() => {
  console.log('done!')
})
somePromise().finally(console.log)
```

## When Not To Use It

If you do not want to be notified when passing an invalid number of arguments to
a Promise function (for example, when using a type checker like Flow or
Typescript), you can safely disable this rule.
