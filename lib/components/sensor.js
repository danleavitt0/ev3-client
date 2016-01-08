import React, {Component} from 'react'
import ColorSensor from '../widgets/colorSensor'
import TouchSensor from '../widgets/touchSensor'
import Motor from '../widgets/motor'
import UltrasonicSensor from '../widgets/ultrasonicSensor'
import NoDevice from '../widgets/noDevice'
import {FontIcon} from 'material-ui/lib'
import Enroute from 'enroute'

var component = Enroute({
  'lego-ev3-l-motor': motor,
  'lego-ev3-m-motor': motor,
  'lego-ev3-color': color,
  'lego-ev3-touch': touch,
  'lego-ev3-us': ultrasonic,
  '*': noDevice
})

var icon

function motor (params, props) {
	icon = 'settings'
	const {path, port, dispatch, value, mode} = props
	return <Motor 
		path={path}
		port={port}
		dispatch={dispatch}
		mode={mode}
		value={value} />
}

function color (params, props) {
	icon = 'color_lens'
	const {path, port, dispatch, value, mode} = props
	return <ColorSensor
		path={path}
		port={port}
		dispatch={dispatch}
		mode={mode}
		value={value}
	/>
}

function touch (params, props) {
	icon = 'touch_app'
	const {path, port, dispatch, value, mode} = props
	return <TouchSensor
		path={path}
		port={port}
		dispatch={dispatch}
		mode={mode}
		value={value}
	/>
}

function ultrasonic (params, props) {
	icon = 'speaker_phone'
	const {path, port, dispatch, value, mode} = props
	return <UltrasonicSensor
		path={path}
		port={port}
		dispatch={dispatch}
		mode={mode}
		value={value}
	/>
}

function noDevice (params, props) {
	icon = 'cancel'
  return <NoDevice/>
}

const styles = {
	container: {
		width: '100%',
		boxShadow: 'inset 0 0 5px 2px rgba(0,0,0,.2)',
		marginBottom: '1px'
	},
	title: {
		display: 'flex',
		alignItems: 'center',
		padding: '10px 20px',
		backgroundColor: '#d5d5d5',
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
	}
	render () {
		var widget = this.props.running ? component(this.props.type || '*', this.props) : <div/>
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
