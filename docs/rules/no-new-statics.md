# Avoid calling `new` on a Promise static method (no-new-statics)

Calling a Promise static method with `new` is invalid, resulting in a
`TypeError` at runtime.

:wrench: The `--fix` option on the command line can automatically fix the
problems reported by this rule.

## Rule Details

This rule is aimed at flagging instances where a Promise static method is called
with `new`.

Examples of **incorrect** code for this rule:

```js
new Promise.resolve(value)
new Promise.reject(error)
new Promise.race([p1, p2])
new Promise.all([p1, p2])
```

Examples of **correct** code for this rule:

```js
Promise.resolve(value)
Promise.reject(error)
Promise.race([p1, p2])
Promise.all([p1, p2])
```

## When Not To Use It

If you do not want to be notified when calling `new` on a Promise static method,
you can safely disable this rule.
