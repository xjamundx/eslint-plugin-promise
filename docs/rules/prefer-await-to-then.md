# Prefer `await` to `then()` for reading Promise values (prefer-await-to-then)

`async` and `await` can be clearer and easier to understand than using `then()`.

## Rule Details

ES2017's `async` and `await` can be easier and clearer to deal with promises
than using `then()` and `catch()`.

Examples of **incorrect** code for this rule:

```js
function example() {
  return myPromise.then(doSomethingSync).then(doSomethingElseAsync)
}

function exampleTwo() {
  return myPromise
    .then(doSomethingSync)
    .then(doSomethingElseAsync)
    .catch(errors)
}
```

Examples of **correct** code for this rule:

```js
async function example() {
  let val = await myPromise()
  val = doSomethingSync(val)
  return doSomethingElseAsync(val)
}

async function exampleTwo() {
  try {
    let val = await myPromise()
    val = doSomethingSync(val)
    return await doSomethingElseAsync(val)
  } catch (err) {
    errors(err)
  }
}
```

## When Not To Use It

If you are not targeting an ES2017 or above environment and do not have a
shim for `async`/`await`, you should disable this rule.

## Further Reading

- [Making asynchronous programming easier with async and await on MDN](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Async_await)
