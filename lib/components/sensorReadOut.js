import React, {Component} from 'react'
import Sensor from './sensor'

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
	render () {
		return (
			<div style={styles.container}>
				{this.props.sensors.map((sensor, i) => 
					<Sensor key={i} {...sensor} />
				)}
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