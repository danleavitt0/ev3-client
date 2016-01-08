import {fetchFile} from '../actions/actions'

export default function ({dispatch, getState}) {
	return next => action => {
    if (action.type === 'URL_DID_CHANGE' && action.payload.split('/')[1] === 'edit') {
      dispatch(fetchFile('/file.get/' + action.payload.split('/')[2]))
    }
    return next(action)
  }
}
