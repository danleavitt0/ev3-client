import {SENSOR_DATA} from '../actions/sensors'

function reducer (state={}, action) {
  switch (action.type) {
    case SENSOR_DATA:
      return {
        ...state,
        sensors: action.payload.currentDevices
      }
  }
  return state
}

export default reducer
