import {DEVICE_DATA, INIT_SENSORS, SET_MODE} from '../actions/sensors'
import setProp from '@f/set-prop'

function reducer (state = {}, action) {
  switch (action.type) {
    case INIT_SENSORS:
      return {
        ...state,
        sensors: action.payload.currentDevices
      }
    case SET_MODE:
   		return setDeviceProp(state, action.payload.port, 'mode', action.payload.mode)
    case DEVICE_DATA:
    	return setDeviceProp(state, action.payload.data.port, 'value', action.payload.date.value)
  }
  return state
}

function setDeviceProp (state, path, key, value) {
	const device = {
		...state.sensors[path],
		key: value
	}
	return setProp(`sensors.${path}`, state, device)
}

export default reducer
