'use strict'

const get = require('get-value')
const getDocsUrl = require('./lib/get-docs-url')
const isPromise = require('./lib/is-promise')

function isFunctionExpression(node) {
  return (
    node.type === 'FunctionExpression' ||
    node.type === 'ArrowFunctionExpression'
  )
}

function areEqualAndTruthy(a, b) {
  return a && b && a === b
}

function arePropertiesEqual(a, b) {
  return (
    areEqualAndTruthy(get(a, 'key.name'), get(b, 'key.name')) &&
    areEqualAndTruthy(get(a, 'value.name'), get(b, 'value.name'))
  )
}

function areElementsEqual(a, b) {
  return areEqualAndTruthy(get(a, 'name'), get(b, 'name'))
}

function areIdentifiersEqual(a, b) {
  return areEqualAndTruthy(get(a, 'name'), get(b, 'name'))
}

function areSameLength(a, b) {
  return a.length === b.length
}

function isIdentityFunctionExpression(node) {
  const param = node.params[0]
  const returnArgument = get(node, 'body.body.0.argument')
  return areIdentifiersEqual(param, returnArgument)
}

function isIdentityArrowFunctionExpression(node) {
  const param = node.params[0]
  const body = node.body
  if (param.type === 'Identifier') {
    const returnArgument =
      body.type === 'Identifier' ? body : get(body, 'body.0.argument')
    return areIdentifiersEqual(param, returnArgument)
  }
  if (param.type === 'ObjectPattern') {
    const bodyProperties =
      body.type === 'BlockStatement'
        ? get(body, 'body.0.argument.properties', [])
        : body.type === 'ObjectExpression'
          ? body.properties
          : []
    return (
      areSameLength(param.properties, bodyProperties) &&
      param.properties.every((property, index) => {
        return arePropertiesEqual(property, bodyProperties[index])
      })
    )
  }
  if (param.type === 'ArrayPattern') {
    const bodyElements =
      body.type === 'BlockStatement'
        ? get(body, 'body.0.argument.elements', [])
        : body.type === 'ArrayExpression'
          ? body.elements
          : []
    return (
      areSameLength(param.elements, bodyElements) &&
      param.elements.every((element, index) => {
        return areElementsEqual(element, bodyElements[index])
      })
    )
  }
  return false
}

function isIdentityFunction(node) {
  switch (node.type) {
    case 'FunctionExpression':
      return isIdentityFunctionExpression(node)
    case 'ArrowFunctionExpression':
      return isIdentityArrowFunctionExpression(node)
    default:
      return false
  }
}

module.exports = {
  meta: {
    docs: {
      url: getDocsUrl('no-identity-handlers')
    }
  },
  create(context) {
    function checkIdentity(node) {
      if (
        node &&
        isFunctionExpression(node) &&
        node.params.length === 1 &&
        isIdentityFunction(node)
      ) {
        context.report({
          node,
          message: 'No identity handlers'
        })
      }
    }
    return {
      CallExpression(node) {
        if (!isPromise(node)) {
          return
        }
        const functionName = node.callee.property.name
        if (functionName === 'then') {
          checkIdentity(node.arguments[0])
          checkIdentity(node.arguments[1])
        }
        if (functionName === 'catch') {
          checkIdentity(node.arguments[0])
        }
      }
    }
  }
}
