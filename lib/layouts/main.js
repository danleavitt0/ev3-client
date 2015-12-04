import React, {Component} from 'react'
import {AppBar} from 'material-ui/lib'

export default class Main extends Component {
	render () {
		return (
			<div>
				<AppBar title={this.props.name || 'Title'}/>
				<div>
					{this.props.children}
				</div>
			</div>
		)
	}
}