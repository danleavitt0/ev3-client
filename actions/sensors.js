import {fetch} from 'redux-effects-fetch'
import {bind} from 'redux-effects'

const DEVICE_DATA = 'DEVICE_DATA'
const INIT_SENSORS = 'INIT_SENSORS'

function findSensors () {
  return bind(fetch('/sensors.find', {
    method: 'POST'
  }), initSensors, (err) => console.warn(err))
}

function getSensorData (path) {
	return bind(fetch('/sensor.data', {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			path: path
		})
	}), deviceData, (err) => console.warn(err))
}

function getMotorData (path) {
	return bind(fetch('/motor.data', {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			path: path
		})
	}), deviceData, (err) => console.warn(err))
}

function deviceData (data) {
	return {
		type: DEVICE_DATA,
		payload: data
	}
}

function setSensorMode (path, mode) {
	return fetch('/sensor.mode', {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			path: path,
			mode: mode
		})
	})
}

function initSensors (data) {
  return {
    type: INIT_SENSORS,
    payload: data
  }
}

export {
  DEVICE_DATA,
  INIT_SENSORS,

  setSensorMode,
  getSensorData,
  getMotorData,
  findSensors
}
