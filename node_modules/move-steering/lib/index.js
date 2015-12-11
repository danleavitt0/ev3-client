/**
 * Imports
 */

var Motor = require('ev3-js-motor')
var defaults = require('101/defaults')

/**
 * Vars
 */

var motorDefaults = {
  speed: 300,
  braking: 'brake',
  wait: false
}

/**
 * Expose driveMotors
 */

module.exports = MoveSteering

/**
 * moveSteering drives with two motors at the same time
 * @param  {String} leftPort  letter of port for left motor
 * @param  {String} rightPort letter of port for right motor
 */

function MoveSteering (leftPort, rightPort) {
  this.motors = [new Motor(leftPort), new Motor(rightPort)]
}

/**
 * run motors forever
 * @param  {Number} speed speed of motor
 * @param  {Object} opts  object of optional params
 */

MoveSteering.prototype.runForever = function (speed, turn, opts) {
  this.motors.forEach(function (motor, i) {
    motor.runForever(speed, defaults(opts, motorDefaults))
  })
}

/**
 * main drive function
 * @param  {Number} degrees degrees to turn motor
 * @param  {Number} speed   speed at which to turn motors
 * @param  {Number} turn    turn direction
 */
MoveSteering.prototype.go = function (degrees, speed, turn) {
  if (turn > 100) { turn = 100 }
  if (turn < -100) { turn = -100 }
  var offDegrees = degrees * ((100 - (Math.abs(turn) * 2)) / 100)
  if (turn === 0) {
    this.motors[0].runDegrees(degrees, {speed: speed, wait: false})
    this.motors[1].runDegrees(degrees, {speed: speed, wait: false})
  } else if (turn > 0) {
    this.motors[0].runDegrees(degrees, {speed: speed, wait: false})
    this.motors[1].runDegrees(offDegrees, {speed: speed, wait: false})
  } else if (turn < 0) {
    this.motors[0].runDegrees(offDegrees, {speed: speed, wait: false})
    this.motors[1].runDegrees(degrees, {speed: speed, wait: false})
  }
  while (this.motors[0].is('running') || this.motors[1].is('running')) {}
}

/**
 * stops motors
 */

MoveSteering.prototype.stop = function () {
  this.motors.forEach(function (motor) {
    motor.stop()
  })
}
