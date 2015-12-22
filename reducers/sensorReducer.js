import {DEVICE_DATA, INIT_SENSORS} from '../actions/sensors'
import setProp from '@f/set-prop'

function reducer (state={}, action) {
  switch (action.type) {
    case INIT_SENSORS:
      return {
        ...state,
        sensors: action.payload.currentDevices
      }
    case DEVICE_DATA:
    	const sensor = {
    		...state.sensors[action.payload.data.port],
    		value: action.payload.data.value
    	}
    	const path = action.payload.data.port
    	return setProp(`sensors.${path}`, state, sensor)
  }
  return state
}

export default reducer
