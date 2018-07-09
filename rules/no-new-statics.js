'use strict'

const matches = require('@macklinu/matches')
const getDocsUrl = require('./lib/get-docs-url')

const isPromiseStatic = matches({
  'callee.type': 'MemberExpression',
  'callee.object.name': 'Promise',
  'callee.property.name': /all|race|reject|resolve/
})

module.exports = {
  meta: {
    docs: {
      url: getDocsUrl('no-new-statics')
    }
  },
  create(context) {
    return {
      NewExpression(node) {
        if (isPromiseStatic(node)) {
          context.report({
            node,
            message: "Avoid calling 'new' on 'Promise.{{ name }}()'",
            data: { name: node.callee.property.name }
          })
        }
      }
    }
  }
}
