'use strict'

const matches = require('@macklinu/matches')
const getDocsUrl = require('./lib/get-docs-url')
const isPromise = require('./lib/is-promise')

const isReturnStatement = matches({ type: 'ReturnStatement' })

const doesFinallyContainReturnStatement = matches({
  'callee.property.name': 'finally',
  'arguments.0.body.body': (body = []) => body.some(isReturnStatement)
})

module.exports = {
  meta: {
    docs: {
      url: getDocsUrl('no-return-in-finally')
    }
  },
  create(context) {
    return {
      CallExpression(node) {
        if (isPromise(node) && doesFinallyContainReturnStatement(node)) {
          context.report({
            node: node.callee.property,
            message: 'No return in finally'
          })
        }
      }
    }
  }
}
