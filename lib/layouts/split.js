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

function replaceHeight (element) {
	return React.cloneElement(element, {style: {display: 'flex', height: window.innerHeight - 64}})
}

export default class Split extends Component {
	constructor (props) {
		super(props)
	}
	render () {
		let elements = (
			<div style={styles.container}>
				<div style={styles.left}>
					{this.props.left}
				</div>
				<div style={styles.right}>
					{this.props.right}
				</div>
			</div>
		)
		return (
			<div>
				{this.props.nav}
				{replaceHeight(elements)}
			</div>
		)
	}
}
