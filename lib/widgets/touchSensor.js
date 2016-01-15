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

const colors = {
	'0': 'white',
	'1': 'black'
}

class TouchSensor extends Component {
	constructor (props) {
		super(props)
	}
	componentDidMount () {
		this.interval = setInterval(() => this.props.dispatch(getSensorData(this.props.path, this.props.port)), this.props.interval)
	}
	componentWillUnmount () {
		clearInterval(this.interval)
	}
	render () {
		const color = colors[this.props.value]
		return (
			<div style={styles.container}>
				<div style={merge(styles.color, {backgroundColor: color})} />
			</div>
		)
	}
}

export default TouchSensor