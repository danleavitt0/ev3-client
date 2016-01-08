export default function addSocket (socket) {
	return ({dispatch, getState}) => {
		socket.on('action', function (data){
			console.log(data)
			dispatch(data)
		})
		return next => action => next(action)
	}
}