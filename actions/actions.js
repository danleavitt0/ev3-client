import {bindUrl, setUrl} from 'redux-effects-location'
import {fetch} from 'redux-effects-fetch'
import {bind} from 'redux-effects'
import {getFileList} from './initialize'

const LOAD_FILE = 'LOAD_FILE'
const IS_SAVING = 'IS_SAVING'
const FINISH_SERVER = 'FINISH_SERVER'
const IS_LOADING = 'IS_LOADING'
const IS_RUNNING = 'IS_RUNNING'
const SAVE_LOG = 'SAVE_LOG'
const SET_API_URL = 'SET_API_URL'

function startRun (apiUrl, file) {
	return [
		bind(fetch(apiUrl + '/file.run', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				fileName: file
			})
		}), finishServer, (err) => console.warn(err)),
		startRunning()
	]
}


function fetchSave (apiUrl, title, text) {
	return bind(fetch(apiUrl + '/file.save', {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			name: title,
			text: text
		})
	}), finishServer, (err) => console.warn(err))
}

function fetchFile (apiUrl, url) {
	return [
		bind(fetch(apiUrl + url, {
     		method: 'POST'
    	}), loadFile, (err) => console.warn(err)),
		isLoading()
	]
}

function stop (apiUrl) {
	return fetch(apiUrl + '/file.stop', {
		method: 'POST',
	})
}

function startRunning () {
	return {
		type: IS_RUNNING
	}
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

function finishServer (data) {
	return {
		type: FINISH_SERVER,
		payload: data
	}
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

function startPull (apiUrl) {
	return fetch(apiUrl + '/source.update', {
		method: 'POST'
	})
}

function setNewUrl (url) {
	return setUrl(url)
}

function getLog (apiUrl) {
	return bind(fetch(apiUrl + '/log.get', {
			method: 'POST'
		}), saveLog, err => console.warn(err))
}

function clearLog (apiUrl) {
	return fetch(apiUrl + '/log.clear', {
		method: 'POST'
	})
}

function saveLog (data) {
	return {
		type: SAVE_LOG,
		payload: data
	}
}

function connectEV3 (url) {
	return bind(fetch('/connect', {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			url
		})
	}), setApiUrl, (err) => console.warn(err))
}

function setApiUrl (msg) {
	return [
		{
			type: SET_API_URL,
			payload: {
				url: msg.url
			}
		},
		getFileList(msg.url)
	]
}


export {
	LOAD_FILE,
	IS_SAVING,
	FINISH_SERVER,
	IS_LOADING,
	IS_RUNNING,
	SAVE_LOG,
	SET_API_URL,

	fetchFile,
	startSave,
	setNewUrl,
	startRun,
	stop,
	getLog,
	startPull,
	clearLog,
	connectEV3
}
