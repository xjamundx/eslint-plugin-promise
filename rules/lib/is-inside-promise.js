'use strict'

const matches = require('@macklinu/matches')

module.exports = matches({
  type: /FunctionExpression|ArrowFunctionExpression/,
  'parent.callee.property.name': /then|catch/
})
