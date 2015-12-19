import {getSensorData, SENSOR_DATA} from '../actions/sensors'

export default function ({dispatch, getState}) {
	return next => action => {
    dispatch(getSensorData())
    return next(action)
  }
}
