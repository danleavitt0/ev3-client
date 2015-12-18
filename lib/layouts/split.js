import React, {Component} from 'react'
import {merge} from '../utils'

var styles = {
	container: {
		display: 'flex'
	}
}

export default class Split extends Component {
	constructor (props) {
		super(props)
		this.state = {
			height: window.innerHeight - 64
		}
	}
	componentDidMount () {
		window.addEventListener('resize', this.handleResize.bind(this))
	}
	handleResize (e) {
		this.setState({
			height: window.innerHeight - 64
		})
	}
	render () {
		return (
			<div>
				{this.props.nav}
				<div style={merge(styles.container, {height: this.state.height})}>
					<div style={{height: '100%'}}>
						{this.props.left}
					</div>
					<div>
						{this.props.right}
					</div>
				</div>
			</div>
		)
	}
}