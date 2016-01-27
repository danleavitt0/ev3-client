import {createStore, applyMiddleware} from 'redux'
import reducer from './reducers'
import multi from 'redux-multi'
import effects from 'redux-effects'
import events from 'redux-effects-events'
import location from 'redux-effects-location'
import logger from 'redux-logger'
import fetch from 'redux-effects-fetch'
import localStorage from 'redux-effects-localstorage'
import getFile from './middleware/getFile'
import persist from './middleware/persist'

const middlewares = [
	multi,
  effects,
  fetch,
  events(),
  location(),
	localStorage(window.localStorage),
  getFile,
	persist
]

export default initialState => applyMiddleware(...middlewares)(createStore)(reducer, initialState)
