import React, {Component} from 'react'
import MainLayout from '../layouts/main'
import {LinearProgress} from 'material-ui/lib'
import Nav from '../components/nav'
import Button from '../components/button'

export default class NotFound extends Component {
	render () {
		return (
			<MainLayout nav={<Nav iconLeft={<Button/>} title={this.props.title } />}>
				<LinearProgress mode="indeterminate" size={1.5} />
			</MainLayout>
		)
	}
}