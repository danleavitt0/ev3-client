import {URL_DID_CHANGE, LOAD_FILE, IS_SAVING, FINISH_SAVING, IS_LOADING} from './actions'


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
		case FINISH_SAVING:
			return {
				...state,
				saving: false,
				saveMessage: action.payload
			}
	}
	return state
}

export default reducer