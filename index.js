import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './app'
import createStore from './store'

const store = createStore({
	url: '/'
})

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>, 
	document.getElementById('app')
)
