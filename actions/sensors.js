import {fetch} from 'redux-effects-fetch'
import {bind} from 'redux-effects'

const SENSOR_DATA = 'SENSOR_DATA'

function getSensorData () {
  return bind(fetch('/sensors.data', {
    method: 'POST'
  }), sensorData, (err) => console.warn(err))
}

function sensorData (data) {
  return {
    type: SENSOR_DATA,
    payload: data
  }
}

export {
  SENSOR_DATA,
  getSensorData
}
