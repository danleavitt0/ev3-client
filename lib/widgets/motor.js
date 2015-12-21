import React, {Component} from 'react'
import {DropDownMenu} from 'material-ui/lib'

const styles = {
	container: {
		display: 'flex',
		padding: 20
	},
	dropDown: {
		marginTop: '-15px',
		flex: 1,
		left: -20
	}
}

const items = [
	{ payload: 'degrees', text: 'Degrees' },
	{ payload: 'rotations', text: 'Rotations' },
	{ payload: 'power', text: 'Power' }
]

class Motor extends Component {
	constructor (props) {
		super(props)
	}
	swapMode (e, i, item) {
		console.log(item.payload)
	}
	render () {
		return (
			<div style={styles.container}>
				<DropDownMenu
					style={styles.dropDown}
					menuItems={items}
					onChange={this.swapMode.bind(this)} />
				<div style={merge(styles.color, {backgroundColor: color})} />
			</div>
		)
	}
}

export default Motor