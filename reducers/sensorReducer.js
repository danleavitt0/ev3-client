import {DEVICE_DATA, INIT_SENSORS} from '../actions/sensors'

function reducer (state={}, action) {
  switch (action.type) {
    case INIT_SENSORS:
      return {
        ...state,
        sensors: action.payload.currentDevices
      }
  }
  return state
}

export default reducer
