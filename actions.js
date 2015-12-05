import {bindUrl, setUrl} from 'redux-effects-location'
import {fetch} from 'redux-effects-fetch'
import {bind} from 'redux-effects'

const URL_DID_CHANGE = 'URL_DID_CHANGE'
const LOAD_FILE = 'LOAD_FILE'
const IS_SAVING = 'IS_SAVING'
const FINISH_SAVING = 'FINISH_SAVING'
const IS_LOADING = 'IS_LOADING'

function initializeApp () {
  return [
    bindUrl(urlDidChange)
  ]
}

function startRun (file) {
	return bind(fetch('/run', {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			fileName: file
		})
	}))
}

function startSave (title, text) {
	return [
		fetchSave(title, text),
		isSaving()
	]
}

function isSaving () {
	return {
		type: IS_SAVING
	}
}

function finishSave (data) {
	return {
		type: FINISH_SAVING,
		payload: data
	}
}

function fetchSave (title, text) {
	return bind(fetch('/save', {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			name: title,
			text: text
		})
	}), finishSave, (err) => console.warn(err))
}

function fetchFile (url) {
	return [
		bind(fetch(url), loadFile, (err) => console.warn(err)),
		isLoading()
	]
}

function isLoading () {
	return {
		type: IS_LOADING
	}
}

function loadFile (file) {
	return {
		type: LOAD_FILE,
		payload: file
	}
}

function setNewUrl (url) {
	return setUrl(url)
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
	IS_SAVING,
	FINISH_SAVING,
	IS_LOADING,

	initializeApp,
	fetchFile,
	startSave,
	setNewUrl,
	startRun
}
