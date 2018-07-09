'use strict'

const matches = require('@macklinu/matches')

module.exports = matches({
  type: 'CallExpression',
  'callee.type': 'MemberExpression',
  'callee.property.name': /then|catch/
})
