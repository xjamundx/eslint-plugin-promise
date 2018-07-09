'use strict'

const matches = require('@macklinu/matches')
const isNamedCallback = require('./is-named-callback')

module.exports = (node, exceptions) =>
  matches({
    type: 'CallExpression',
    'callee.name': name => isNamedCallback(name, exceptions)
  })(node)
