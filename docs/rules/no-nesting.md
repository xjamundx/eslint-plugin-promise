# Avoid nested `then()` or `catch()` statements (no-nesting)

Nesting `then()` or `catch()` statements making code harder to understand and
maintain. Instead, you should return a promise from `then()` or `catch()` to
chain the promises.

## Rule Details



Examples of **incorrect** code for this rule:

```js
myPromise.then(val =>
  doSomething(val).then(doSomethingElse)
)

myPromise.then(val =>
  doSomething(val).catch(errors)
)

myPromise.catch(err =>
  doSomething(err).then(doSomethingElse)
)

myPromise.catch(err =>
  doSomething(err).catch(errors)
)
```

Examples of **correct** code for this rule:

```js
myPromise
  .then(doSomething)
  .then(doSomethingElse)
  .catch(errors)
```

## When Not To Use It

If you want to nest promises, for example to have different `catch()` handlers
to handle the different promises, you can safely disable this rule.

## Further Reading

- [Promises chaining on Javascript.info](https://javascript.info/promise-chaining)
- [Using Promises on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises#Common_mistakes)
- [We have a problem with promises](https://pouchdb.com/2015/05/18/we-have-a-problem-with-promises.html)
  (Rookie mistake #1: the promisey pyramid of doom)
