# Return inside each `then()` to create readable and reusable Promise chains (always-return)

Ensure that inside a `then()` you make sure to `return` a new promise or value.

## Rule Details

Using a promise inside a `then()` without returning it (or using `await`) means
that a potential error from that promise will not be caught in subsequent
`catch()` callbacks. Additionally, returning a non-promise wraps it into a
Promise, allowing it to be used in promise chains, which is convenient when
mixing synchronous and asynchronous code.

We also allow someone to `throw` inside a `then()` which is essentially the same
as `return Promise.reject()` in this scenario.

Examples of **incorrect** code for this rule:

```js
myPromise.then(function(val) {})
myPromise.then(() => {
  doSomething()
})
myPromise.then(b => {
  if (b) {
    return 'yes'
  } else {
    forgotToReturn()
  }
})
```

Examples of **correct** code for this rule:

```js
myPromise.then((val) => val * 2);
myPromise.then(function(val) { return val * 2; });
myPromise.then(doSomething); // could be either
myPromise.then((b) => { if (b) { return "yes" } else { return "no" } });
```

## When Not To Use It

If you want to allow non-returning `then()` callbacks, for example for
synchronous side-effects like below, you can safely disable this rule.

```js
myPromise.then(val => {
  console.log('promise complete')
  console.log(val)
})
```

## Further Reading

- [We have a problem with promises](http://pouchdb.com/2015/05/18/we-have-a-problem-with-promises.html)
  (Rookie mistake #5: using side effects instead of returning)
