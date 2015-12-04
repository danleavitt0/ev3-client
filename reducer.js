import {URL_DID_CHANGE, LOAD_FILE} from './actions'


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
				file: action.payload
			}
	}
	return state
}

export default reducer