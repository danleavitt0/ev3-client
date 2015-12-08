/**
 * Modules
 */

var foreach = require('@micro-js/foreach')

/**
 * Expose mapObj
 */

module.exports = map['default'] = map


/**
 * Map obj
 * @param  {Function} fn  map
 * @param  {Object}   obj object over which to map
 * @return {Object}
 */

function map (fn, obj) {
  var result = {}
  var self = this

  foreach(function (val, key) {
    result[key] = fn.call(self, val, key)
  }, obj)

  return result
}
