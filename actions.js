import {bindUrl} from 'redux-effects-location'
import {fetch} from 'redux-effects-fetch'
import {bind} from 'redux-effects'

const api = 'http://localhost:3000'
const URL_DID_CHANGE = 'URL_DID_CHANGE'
const LOAD_FILE = 'LOAD_FILE'

function initializeApp () {
  return [
    bindUrl(urlDidChange)
  ]
}

function fetchFile (url) {
	return bind(fetch(api + url), loadFile, (err) => console.warn(err))
}

function loadFile (file) {
	return {
		type: LOAD_FILE,
		payload: file
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
	LOAD_FILE,

	initializeApp,
	fetchFile
}