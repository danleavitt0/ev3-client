import React, {Component} from 'react'
import Sensor from './sensor'
import {findSensors} from '../../actions/sensors'

const styles = {
	container: {
		width: '100%',
		fontFamily: 'Roboto, sans-serif'
	}
}

class SensorReadOut extends Component {
	constructor (props) {
		super(props)
	}
	componentDidMount () {
		setInterval(() => this.props.dispatch(findSensors()), 2000)
	}
	render () {
		const {sensors} = this.props.sensors
		const {dispatch} = this.props
		let widgets = []
		for (var key in sensors) {
			widgets.push(
				<Sensor
					key={key}
					port={key}
					dispatch={dispatch}
					path={sensors[key].path}
					type={sensors[key].type}
					value={sensors[key].value}
					mode={sensors[key].mode} />
			)
		}
		return (
			<div style={styles.container}>
				{widgets}
			</div>
		)
	}
}

export default SensorReadOut
