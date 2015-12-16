/**
 * Imports
 */

var inherit = require('component-inherit')
var devices = require('ev3-js-devices')
var Device = require('ev3-js-device')

/**
 * Expose ColorSensor
 */

module.exports = IRSensor['default'] = IRSensor

/**
 * IRSensor Device
 * @param {Number} port number of ir sensor port
 */
function IRSensor (port) {
  if (!(this instanceof IRSensor)) {
    return new IRSensor(port)
  }
  Device.call(this, devices(port))
}

inherit(IRSensor, Device)

Object.defineProperties(IRSensor.prototype, {
  proximity: {
    get: getProximity
  }
})

function getProximity () {
  this.write('mode', 'IR-PROX')
  return this.read('value0')
}

IRSensor.prototype.beacon = function (channel) {
  this.write('mode', 'IR-SEEK')
  return {
    heading: this.read('value' + (channel * 2 - 2)),
    distance: this.read('value' + (channel * 2 - 1))
  }
}

IRSensor.prototype.remote = function (channel) {
  this.write('mode', 'IR-REMOTE')
  return this.read('value' + (channel - 1))
}
