import React, {Component} from 'react'
import Sensor from './sensor'
import Log from './Log'
import {Tabs, Tab} from 'material-ui/lib/tabs'
import {findSensors} from '../../actions/sensors'

const styles = {
	container: {
		width: '100%',
		fontFamily: 'Roboto, sans-serif'
	},
	tabs: {
		backgroundColor: '#fff'
	},
	tab: {
		color: '#333'
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
					mode={sensors[key].mode}
					running={this.props.running} />
			)
		}
		return (
			<div style={styles.container}>
				<Tabs tabItemContainerStyle={styles.tabs}>
					<Tab style={styles.tab} label='console'>
						<Log log={this.props.log} dispatch={dispatch} />
					</Tab>
					<Tab style={styles.tab} label='sensor widgets'>
						{widgets}
					</Tab>
				</Tabs>
			</div>
		)
	}
}

export default SensorReadOut
