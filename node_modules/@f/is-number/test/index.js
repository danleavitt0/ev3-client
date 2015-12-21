/**
 * Imports
 */

var isNumber = require('..')
var test = require('tape')

/**
 * Tests
 */

test('should work', function (t) {
  t.ok(isNumber(1))
  t.ok(isNumber(NaN))
  t.ok(!isNumber('test'))
  t.ok(!isNumber('10'))
  t.end()
})
