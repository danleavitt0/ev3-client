import React, {Component} from 'react'
import ColorSensor from '../widgets/colorSensor'
import Motor from '../widgets/motor'
import NoDevice from '../widgets/noDevice'
import {FontIcon} from 'material-ui/lib'
import Enroute from 'enroute'

var component = Enroute({
  'lego-ev3-l-motor': motor,
  'lego-ev3-color': color,
  '*': noDevice
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

function noDevice (params, props) {
  return <NoDevice/>
}

const styles = {
	container: {
		width: '100%',
		boxShadow: 'inset 0 0 5px 2px rgba(0,0,0,.2)',
		marginBottom: '1px',
    padding: 20
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
    console.log(this.props)
		var widget = component(this.props.type || '*')
		return (
			<div style={styles.container}>
				<div style={styles.title}>
					<FontIcon className='material-icons'>{icon}</FontIcon>
					<div style={styles.type}>
						{this.props.type || 'No device'}
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
