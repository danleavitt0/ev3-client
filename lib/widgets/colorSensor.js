import React, {Component} from 'react'
import {DropDownMenu} from 'material-ui/lib'
import {merge} from '../utils'

const styles = {
	container: {
		display: 'flex'
	},
	dropDown: {
		marginTop: '-15px',
		flex: 1,
		left: -20
	},
	color: {
		height: 30,
		width: 30,
		border: '1px solid #333'
	}
}

const items = [
	{payload: 'COL-REFLECT', text: 'Reflected Light Intensity'},
	{payload: 'COL-COLOR', text: 'Color'}
]

class ColorSensor extends Component {
	constructor (props) {
		super(props)
		this.state = {
			color: 'blue'
		}
	}
	render () {
		return (
			<div style={styles.container}>
				<DropDownMenu style={styles.dropDown} menuItems={items}/>
				<div style={merge(styles.color, {backgroundColor: this.state.color})}>
				</div>
			</div>
		)
	}
}

export default ColorSensor