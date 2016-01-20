import enroute from 'enroute'
import Home from './lib/views/home'
import Editor from './lib/views/editor'
import NotFound from './lib/views/notFound'
import Loading from './lib/views/loading'
import React from 'react'

const router = enroute({
  '/': home,
  '/edit/:id': editor,
  '*': notFound
})

const style = {
	font: {
		fontFamily: 'Roboto, sans-serif'
	}
}

function home (params, props) {
	return <Home
            style={style.font}
            files={props.state.files}
            {...props} />
}

function editor (params, props) {
  if (props.state.loading) {
  	return <Loading />
  }
	return <Editor
    style={style.font}
    title={params.id}
    file={props.file}
    message={props.state.saveMessage}
    sensors={props.sensors}
    log={props.state.log}
    {...props} />
}

function notFound (params, props) {
	return <NotFound style={style.font} />
}

export default router
