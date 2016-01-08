import {bindUrl, setUrl} from 'redux-effects-location'
import {fetch} from 'redux-effects-fetch'
import {bind} from 'redux-effects'

const LOAD_FILE = 'LOAD_FILE'
const IS_SAVING = 'IS_SAVING'
const FINISH_SERVER = 'FINISH_SERVER'
const IS_LOADING = 'IS_LOADING'
const IS_RUNNING = 'IS_RUNNING'
const SAVE_LOG = 'SAVE_LOG'

function startRun (file) {
	return [
		bind(fetch('/file.run', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				fileName: file
			})
		}), (res) => console.log(JSON.stringify(res))),
		startRunning()
	]
}


function fetchSave (title, text) {
	return bind(fetch('/file.save', {
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

function fetchFile (url) {
	return [
		bind(fetch(url, {
     		method: 'POST'
    	}), loadFile, (err) => console.warn(err)),
		isLoading()
	]
}

function stop () {
	return bind(fetch('/file.stop', {
		method: 'POST',
	}), finishServer, (err) => console.warn(err))
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

function setNewUrl (url) {
	return setUrl(url)
}

function getLog () {
	return bind(fetch('/log.get', {
			method: 'POST'
		}), saveLog, err => console.warn(err))
}

function saveLog (data) {
	return {
		type: SAVE_LOG,
		payload: data
	}
}

export {
	LOAD_FILE,
	IS_SAVING,
	FINISH_SERVER,
	IS_LOADING,
	IS_RUNNING,
	SAVE_LOG,

	fetchFile,
	startSave,
	setNewUrl,
	startRun,
	stop,
	getLog
}
