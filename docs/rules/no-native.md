# In an ES5 environment, make sure to create a `Promise` constructor before using (no-native)

Ensure that `Promise` is included fresh in each file instead of relying on the
existence of a native promise implementation. Helpful if you want to use
`bluebird` or if you don't intend to use an ES6 Promise shim.

## Rule Details

If you are targeting an ES5 environment where native promises aren't supported,
ensuring that `Promise` is included from a promise library prevents bugs from
`Promise` being undefined.

Examples of **incorrect** code for this rule:

```js
var x = Promise.resolve('bad')
```

Examples of **correct** code for this rule:

```js
var Promise = require('bluebird')
var x = Promise.resolve('good')
```

## When Not To Use It

If you are targeting an environment that supports native promises, or using a
Promise shim, you should disable this rule.
