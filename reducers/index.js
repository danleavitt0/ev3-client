import {combineReducers} from 'redux'
import serverReducer from './serverReducer'
import sensorReducer from './sensorReducer'

export default combineReducers({
  serverReducer,
  sensorReducer
})
