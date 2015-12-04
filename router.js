import enroute from 'enroute'
import Home from './lib/views/home'
import Editor from './lib/views/editor'
import NotFound from './lib/views/notFound'
import React from 'react'

const router = enroute({
  '/': home,
  '/edit/:id': editor,
  '*': notFound
})

function home (params, props) {
	return <Home {...props}/>
}

function editor (params, props) {
  console.log('router', props, params)
	return <Editor title={params.id} file={props.file} {...props}/>
}

function notFound (params, props) {
	return <NotFound />
}

export default router
