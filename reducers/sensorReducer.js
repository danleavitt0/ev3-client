import {DEVICE_DATA, INIT_SENSORS, SET_MODE} from '../actions/sensors'
import setProp from '@f/set-prop'
import _ from 'lodash'

function reducer (state = {}, action) {
  switch (action.type) {
    case INIT_SENSORS:
      return {
        ...state,
        sensors: mergeSensors(_.clone(state.sensors, true), action.payload.currentDevices)
      }
    case SET_MODE:
   		return setDeviceProp(state, action.payload.port, 'mode', action.payload.mode)
    case DEVICE_DATA:
    	return setDeviceProp(state, action.payload.data.port, 'value', action.payload.data.value)
  }
  return state
}

function mergeSensors (sensors=[], update) {
	for (let key in update) {
		if (!sensors[key].type || sensors[key].type === 'No device connected' || update[key] === 'No device connected')
			sensors[key] = update[key]
	}
	return sensors
}

function setDeviceProp (state, path, key, value) {
	const device = {
		...state.sensors[path],
		key: value
	}
	return setProp(`sensors.${path}`, state, device)
}

export default reducer
