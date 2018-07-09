/**
 * Rule: catch-or-return
 * Ensures that promises either include a catch() handler
 * or are returned (to be handled upstream)
 */

'use strict'

const matches = require('@macklinu/matches')
const getDocsUrl = require('./lib/get-docs-url')
const isPromise = require('./lib/is-promise')

module.exports = {
  meta: {
    docs: {
      url: getDocsUrl('catch-or-return')
    },
    messages: {
      terminationMethod: 'Expected {{ terminationMethod }}() or return'
    }
  },
  create(context) {
    const options = context.options[0] || {}
    const allowThen = options.allowThen
    let terminationMethod = options.terminationMethod || 'catch'

    if (typeof terminationMethod === 'string') {
      terminationMethod = [terminationMethod]
    }

    // somePromise.then(a, b)
    const isThenWithTwoArgs = matches({
      'expression.type': 'CallExpression',
      'expression.callee.type': 'MemberExpression',
      'expression.callee.property.name': 'then',
      'expression.arguments': (args = []) => args.length === 2
    })

    // somePromise.catch() OR somePromise['catch']()
    const isPromiseCatch = matches({
      'expression.type': 'CallExpression',
      'expression.callee.type': 'MemberExpression',
      'expression.callee.property': ({ name, type, value } = {}) => {
        return (
          terminationMethod.indexOf(name) !== -1 ||
          (type === 'Literal' && value === 'catch')
        )
      }
    })

    return {
      ExpressionStatement(node) {
        if (!isPromise(node.expression)) {
          return
        }

        if (allowThen && isThenWithTwoArgs(node)) {
          return
        }

        if (isPromiseCatch(node)) {
          return
        }

        context.report({
          node,
          messageId: 'terminationMethod',
          data: { terminationMethod }
        })
      }
    }
  }
}
