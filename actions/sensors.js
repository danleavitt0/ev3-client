import {fetch} from 'redux-effects-fetch'
import {bind} from 'redux-effects'

const DEVICE_DATA = 'DEVICE_DATA'
const INIT_SENSORS = 'INIT_SENSORS'
const SET_MODE = 'SET_MODE'

function findSensors (apiUrl) {
  return bind(fetch(apiUrl + '/sensors.find', {
    method: 'POST'
  }), initSensors, (err) => console.warn(err))
}

function getSensorData (apiUrl, path, port, ext) {
	return bind(fetch(apiUrl + '/sensor.data', {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			path: path,
			port: port,
			ext: ext
		})
	}), deviceData, (err) => console.warn(err))
}

function deviceData (data) {
	return {
		type: DEVICE_DATA,
		payload: data
	}
}

function setSensorMode (apiUrl, path, mode, port) {
	return [
		fetch(apiUrl + '/sensor.mode', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				path: path,
				mode: mode
			})
		}),
		setMode(mode, port)
	]
}

function setMode (mode, port) {
	return {
		type: SET_MODE,
		payload: {
			mode: mode,
			port: port
		}
	}
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
  SET_MODE,

  setSensorMode,
  getSensorData,
  findSensors
}
