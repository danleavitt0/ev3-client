import {URL_DID_CHANGE, LOAD_FILE, IS_SAVING, FINISH_SERVER, IS_LOADING, IS_RUNNING} from './actions'


function reducer (state, action) {
	switch (action.type) {
		case URL_DID_CHANGE:
			return {
				...state,
				url: action.payload
			}
		case LOAD_FILE:
			return {
				...state,
				file: action.payload,
				loading: false
			}
		case IS_LOADING:
			return {
				...state,
				loading: true
			}
		case IS_SAVING:
			return {
				...state,
				saving: true,
				saveMessage: ''
			}
		case IS_RUNNING:
			console.log('is_running')
			return {
				...state,
				running: true,
				saveMessage: ''
			}
		case FINISH_SERVER:
			return {
				...state,
				saving: false,
				running: false,
				saveMessage: action.payload.message
			}
	}
	return state
}

export default reducer