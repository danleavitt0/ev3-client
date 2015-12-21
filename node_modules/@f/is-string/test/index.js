/**
 * Imports
 */

var isString = require('..')
var test = require('tape')

/**
 * Tests
 */

test('string is string', function (t) {
  t.equal(isString('test'), true)
  t.end()
})

test('empty is not string', function (t) {
  t.equal(isString(), false)
  t.end()
})

test('undefined is not string', function (t) {
  t.equal(isString(undefined), false)
  t.end()
})

test('null is not string', function (t) {
  t.equal(isString(null), false)
  t.end()
})

test('obj is not string', function (t) {
  t.equal(isString({}), false)
  t.end()
})

test('array is not string', function (t) {
  t.equal(isString([]), false)
  t.end()
})

test('number is not string', function (t) {
  t.equal(isString(1), false)
  t.end()
})
