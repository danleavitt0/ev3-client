import {fetchFile} from '../actions'

export default function ({dispatch, getState}) {
	return next => action => {
		console.log('fetch middleware')
    if (action.type === 'URL_DID_CHANGE' && action.payload.split('/')[1] === 'edit') {
      dispatch(fetchFile(action.payload))
    }
    return next(action)
  }
}