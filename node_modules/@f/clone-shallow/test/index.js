/**
 * Imports
 */

var clone = require('..')
var test = require('tape')

/**
 * Tests
 */

test('should copy arrays', function (t) {
  var arr = [1, 2, 3, 4]
  var newArr = clone(arr)

  t.deepEqual(arr, newArr)
  t.notEqual(arr, newArr)

  t.end()
})

test('should copy objects', function (t) {
  var obj = {a: 1, b: 2, c: 3}
  var newObj = clone(obj)

  t.deepEqual(obj, newObj)
  t.notEqual(obj, newObj)

  t.end()
})
