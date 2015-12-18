import React, {Component} from 'react'
import ColorSensor from '../widgets/colorSensor'
import Motor from '../widgets/motor'
import {FontIcon} from 'material-ui/lib'
import Enroute from 'enroute'

var component = Enroute({
  'motor': motor,
  'color': color
})

var icon

function motor (params, props) {
	icon = 'settings'
	return <Motor />
}

function color (params, props) {
	icon = 'color_lens'
	return <ColorSensor />
}

const styles = {
	container: {
		width: '100%',
		boxShadow: 'inset 0 0 5px 2px rgba(0,0,0,.2)',
		marginBottom: '0.5px'
	},
	title: {
		display: 'flex',
		alignItems: 'center',
		padding: '10px 20px',
		backgroundColor: '#e5e5e5',
		color: '#333',
		height: 22,
	},
	type: {
		flex: 1,
		margin: '0 10px',
		textTransform: 'capitalize'
	},
	widget: {
		padding: 20
	}
}

class Sensor extends Component {
	constructor (props) {
		super(props)
		this.state = {
			data: '',
			mode: ''
		}
	}
	render () {
		var widget = component(this.props.type)
		return (
			<div style={styles.container}>
				<div style={styles.title}>
					<FontIcon className='material-icons'>{icon}</FontIcon>
					<div style={styles.type}>
						{this.props.type}
					</div>
					<div>
						{this.props.port}
					</div>
				</div>
				<div style={styles.widget}>
					{widget}
				</div>
			</div>
		)
	}
}

export default Sensor