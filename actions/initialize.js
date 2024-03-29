import {bindUrl, setUrl} from 'redux-effects-location'
import {fetch} from 'redux-effects-fetch'
import {bind} from 'redux-effects'
import {getItem} from 'redux-effects-localstorage'

const URL_DID_CHANGE = 'URL_DID_CHANGE'
const SET_FILE_LIST = 'SET_FILE_LIST'
const localStorageKey = 'ev3-js'
const SET_API_URL = 'SET_API_URL'
const REMOVE_API_URL = 'REMOVE_API_URL'

function initializeApp () {
  return [
    hydrateApiUrl(),
    bindUrl(urlDidChange)
  ]
}

function hydrateApiUrl () {
  return bind (
    getItem(localStorageKey),
    url => url && hydrateState(url)
  )
}

function hydrateState (url) {
  return [
    getFileList(url),
    {
      type: SET_API_URL,
      payload: {
        url
      }
    }
  ]
}

function getFileList (apiUrl) {
	return bind(fetch(apiUrl + '/file.getAll', {
    method: 'POST'
  }), setList, removeApi)
}

function setList (files) {
	return {
		type: SET_FILE_LIST,
		payload: files.data
	}
}

function removeApi () {
  return {
    type: REMOVE_API_URL
  }
}

function urlDidChange (url) {
  return {
    type: URL_DID_CHANGE,
    payload: url
  }
}

export {
  URL_DID_CHANGE,
  SET_FILE_LIST,
  REMOVE_API_URL,

  initializeApp,
  getFileList
}
