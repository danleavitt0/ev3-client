import React, {Component} from 'react'
import Sensor from './sensor'
import {getSensorData} from '../../actions/sensors'

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
		setInterval(() => this.props.dispatch(getSensorData()), 2000)
	}
	render () {
		const {sensors} = this.props.sensors
		let widgets = []
		for (var key in sensors) {
			widgets.push(<Sensor key={key} port={key} type={sensors[key].type}/>)
		}
		return (
			<div style={styles.container}>
				{widgets}
			</div>
		)
	}
}

SensorReadOut.defaultProps = {
	sensors: [
		{
			port: 'A',
			type: 'color',
			value: 45,
			mode: 'color'
		},
		{
			port: 'B',
			type: 'motor',
			value: 2000,
			mode: 'degrees'
		}
	]
}

export default SensorReadOut
