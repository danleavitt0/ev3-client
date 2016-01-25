import {fetchFile} from '../actions/actions'

export default function ({dispatch, getState}) {
	return next => action => {
    if (action.type === 'URL_DID_CHANGE' && action.payload.split('/')[1] === 'edit') {
    	let fileName = action.payload.split('/')[2]
    	const extension = fileName.split('.')[1]
    	if (!extension) {
    		fileName += '.js'
    		action.payload += '.js'
    	}
      dispatch(fetchFile('/file.get/' + fileName))
    }
    return next(action)
  }
}
