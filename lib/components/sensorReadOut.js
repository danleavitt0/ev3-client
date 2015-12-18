import React, {Component} from 'react'
import Sensor from './sensor'

class SensorReadOut extends Component {
	constructor (props) {
		super(props)
	}
	render () {
		return (
			<div>
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
			name: 'color',
			value: 45,
			mode: 'color'
		},
		{
			port: 'B',
			name: 'motor',
			value: 2000,
			mode: 'degrees'
		}
	]
}

export default SensorReadOut