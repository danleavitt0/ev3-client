import {fetch} from 'redux-effects-fetch'
import {bind} from 'redux-effects'

const SENSOR_DATA = 'SENSOR_DATA'

function getSensorData () {
  return bind(fetch('/sensors.data', {
    method: 'POST'
  }), sensorData, (err) => console.warn(err))
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

function sensorData (data) {
  return {
    type: SENSOR_DATA,
    payload: data
  }
}

export {
  SENSOR_DATA,

  setSensorMode,
  getSensorData
}
