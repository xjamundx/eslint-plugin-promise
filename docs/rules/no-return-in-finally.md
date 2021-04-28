# Disallow return statements in `finally()` (no-return-in-finally)

Disallow return statements inside a callback passed to `finally()`, since
nothing would consume what's returned.

## Rule Details

Returning statements inside a `finally()` callback does not have any effect and
can indicate a misunderstanding of how `finally()` works.

This rule does not report returning with concise arrow function expressions,
because it can be used to avoid unnecessary braces.

Examples of **incorrect** code for this rule:

```js
myPromise.finally(function(val) {
  return val
})
```

Examples of **correct** code for this rule:

```js
myPromise.finally(function(val) {
  console.log('value:', val)
})

myPromise.finally(val => console.log('value:', val))
```

## When Not To Use It

If you do not want to be notified when using `return` in `finally()` callbacks,
you can safely disable this rule.
