'use strict'

const matches = require('@macklinu/matches')
const isInsidePromise = require('./is-inside-promise')

const isCallExpression = matches({
  type: /FunctionExpression|ArrowFunctionExpression|FunctionDeclaration/
})

const isFirstArgError = matches({
  'params.0.name': /^err(or)?$/
})

function isInsideCallback(node) {
  // it's totally fine to use promises inside promises
  if (isInsidePromise(node)) {
    return false
  }

  return isCallExpression(node) && isFirstArgError(node)
}

module.exports = isInsideCallback
