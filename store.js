import {createStore, applyMiddleware} from 'redux'
import reducer from './reducers'
import multi from 'redux-multi'
import effects from 'redux-effects'
import events from 'redux-effects-events'
import location from 'redux-effects-location'
import logger from 'redux-logger'
import fetch from 'redux-effects-fetch'
import sensorData from './middleware/sensorData'
import getFile from './middleware/getFile'
import socketConnection from './middleware/socketConnection'
import io from 'socket.io-client'
let socket = io('http://localhost:3000', {multiplex: false})

const middlewares = [
	multi,
  effects,
  fetch,
  events(),
  location(),
  getFile,
  socketConnection(socket)
]

export default initialState => applyMiddleware(...middlewares)(createStore)(reducer, initialState)
