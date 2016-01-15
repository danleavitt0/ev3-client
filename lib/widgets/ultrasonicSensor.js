import React, {Component} from 'react'
import {DropDownMenu} from 'material-ui/lib'
import {setSensorMode, getSensorData} from '../../actions/sensors'
import {merge} from '../utils'

const styles = {
	container: {
		display: 'flex',
		padding: 20
	},
	dropDown: {
		marginTop: '-15px',
		flex: 1,
		left: -20
	},
	color: {
		height: 30,
		width: 30,
		border: '1px solid rgba(51, 51, 51, 0.3)',
		borderRadius: '50%'
	}
}

const items = [
	{ payload: 'US-DIST-CM', text: 'Centimeters' },
	{ payload: 'US-DIST-IN', text: 'Inches' }
]

class UltrasonicSensor extends Component {
	constructor (props) {
		super(props)
	}
	componentDidMount () {
		this.interval = setInterval(() => this.props.dispatch(getSensorData(this.props.path, this.props.port)), this.props.interval)
	}
	componentWillUnmount () {
		clearInterval(this.interval)
	}
	swapMode (e, i, item) {
		this.props.dispatch(setSensorMode(this.props.path, item.payload, this.props.port))
	}
	render () {
		return (
			<div style={styles.container}>
				<DropDownMenu
					style={styles.dropDown}
					menuItems={items}
					onChange={this.swapMode.bind(this)} />
				{this.props.value / 10}
			</div>
		)
	}
}

export default UltrasonicSensor