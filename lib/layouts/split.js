import React, {Component} from 'react'
import {merge} from '../utils'

var styles = {
	container: {
		display: 'flex'
	},
	left: {
		flex: 3,
		height: '100%'
	},
	right: {
		flex: 1,
		height: '100%',
		overflow: 'scroll',
		overflowX: 'hidden',
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
					<div style={styles.left}>
						{this.props.left}
					</div>
					<div style={styles.right}>
						{this.props.right}
					</div>
				</div>
			</div>
		)
	}
}
