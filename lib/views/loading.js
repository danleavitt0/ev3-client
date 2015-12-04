import React, {Component} from 'react'
import MainLayout from '../layouts/main'
import {CircularProgress} from 'material-ui/lib'

export default class NotFound extends Component {
	render () {
		return (
			<MainLayout title={'EV3.js'}>
				<CircularProgress mode="indeterminate" size={1.5} />
			</MainLayout>
		)
	}
}