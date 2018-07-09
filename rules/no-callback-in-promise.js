/**
 * Rule: no-callback-in-promise
 * Avoid calling back inside of a promise
 */

'use strict'

const matches = require('@macklinu/matches')
const getDocsUrl = require('./lib/get-docs-url')
const hasPromiseCallback = require('./lib/has-promise-callback')
const isInsidePromise = require('./lib/is-inside-promise')
const isCallback = require('./lib/is-callback')

const isFirstArgumentCallback = matches({
  'arguments.0.name': /callback|cb|next|done/
})

module.exports = {
  meta: {
    docs: {
      url: getDocsUrl('no-callback-in-promise')
    },
    messages: {
      callback: 'Avoid calling back inside of a promise.'
    }
  },
  create(context) {
    return {
      CallExpression(node) {
        const options = context.options[0] || {}
        const exceptions = options.exceptions || []
        if (!isCallback(node, exceptions)) {
          // in general we send you packing if you're not a callback
          // but we also need to watch out for whatever.then(cb)
          if (hasPromiseCallback(node) && isFirstArgumentCallback(node)) {
            context.report({
              node: node.arguments[0],
              messageId: 'callback'
            })
          }
          return
        }
        if (context.getAncestors().some(isInsidePromise)) {
          context.report({
            node,
            messageId: 'callback'
          })
        }
      }
    }
  }
}
