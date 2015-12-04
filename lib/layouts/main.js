import React, {Component} from 'react'

export default class Main extends Component {
	render () {
		return (
			<div>
				{this.props.nav}
				<div>
					{this.props.children}
				</div>
			</div>
		)
	}
}