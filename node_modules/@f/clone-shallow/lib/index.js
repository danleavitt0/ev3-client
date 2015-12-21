/**
 * Modules
 */

var cloneObj = require('@f/clone-obj')

/**
 * Expose cloneShallow
 */

module.exports = cloneShallow['default'] = cloneShallow

/**
 * Clone object or array shallow
 * @param  {Object|Array} a object to copy
 * @return {Object|Array}
 */

function cloneShallow (a) {
  return Array.isArray(a)
    ? a.slice()
    : cloneObj(a)
}
