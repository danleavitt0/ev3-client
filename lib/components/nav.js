import {AppBar, FlatButton} from 'material-ui/lib'
import React, {Component} from 'react'
import isArray from '@f/is-array'

const styles = {
	buttonContainer: {
		didFlip: 'true',
    marginLeft: 'auto',
	},
	button: {
		background: 'none',
		color: '#fff',
		backgroundColor: 'transparent',
		marginTop: 8
	}
}

class Nav extends Component {
	constructor (props) {
		super(props)
	}
	render () {
		let {iconRight, iconLeft} = this.props
		if (isArray(iconRight)) {
			iconRight = (
				<div style={styles.buttonContainer}>
					{iconRight.map((element, idx) => element && React.cloneElement(element, {style: styles.button, key: idx}))}
				</div>
			)
		}
		iconLeft = iconLeft ? iconLeft : <div/>
		return (
			<AppBar
				title={this.props.title}
				iconElementLeft={iconLeft}
				iconElementRight={iconRight} >
			</AppBar>
		)
	}
}

export default Nav
