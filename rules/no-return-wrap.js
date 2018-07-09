/**
 * Rule: no-return-wrap function
 * Prevents uneccessary wrapping of results in Promise.resolve
 * or Promise.reject as the Promise will do that for us
 */

'use strict'

const matches = require('@macklinu/matches')
const getDocsUrl = require('./lib/get-docs-url')
const isPromise = require('./lib/is-promise')

function isInPromise(context) {
  const expression = context
    .getAncestors()
    .filter(node => node.type === 'ExpressionStatement')[0]
  return expression && expression.expression && isPromise(expression.expression)
}

const isReturningWrappedValue = matches({
  'argument.type': 'CallExpression',
  'argument.callee.object.name': 'Promise',
  'argument.callee.property.name': /resolve|reject/
})

module.exports = {
  meta: {
    docs: {
      url: getDocsUrl('no-return-wrap')
    },
    messages: {
      resolve: 'Avoid wrapping return values in Promise.resolve',
      reject: 'Expected throw instead of Promise.reject'
    }
  },
  create(context) {
    const options = context.options[0] || {}
    const allowReject = options.allowReject

    return {
      ReturnStatement(node) {
        if (isInPromise(context) && isReturningWrappedValue(node)) {
          const name = node.argument.callee.property.name
          if (name === 'resolve') {
            context.report({ node, messageId: 'resolve' })
          } else if (!allowReject && name === 'reject') {
            context.report({ node, messageId: 'reject' })
          }
        }
      }
    }
  }
}
