import {persistUrl} from '../actions/actions'

export default function ({dispatch, getState}) {
  return next => action => {
    if (action.type === 'SET_API_URL') {
      next(action)
      const nextState = getState().serverReducer
      dispatch(persistUrl(nextState.apiUrl))
    } else {
      return next(action)
    }
  }
}
