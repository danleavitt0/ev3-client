import React, {Component} from 'react'
import {DropDownMenu} from 'material-ui/lib'
import {getSensorData, setSensorMode} from '../../actions/sensors'

const styles = {
	container: {
		display: 'flex',
		padding: 20
	},
	dropDown: {
		marginTop: '-15px',
		flex: 1,
		left: -20
	}
}

const items = [
	{ payload: ['position', 1], text: 'Degrees' },
	{ payload: ['position', 360], text: 'Rotations' },
	{ payload: ['speed_sp', 1], text: 'Power' }
]

class Motor extends Component {
	constructor (props) {
		super(props)
	}
	swapMode (e, i, item) {
		this.setState({
			divisor: item.payload[1]
		})
		this.props.dispatch(setSensorMode(this.props.path, item.payload[0], this.props.port))
	}
	componentDidMount () {
		this.interval = setInterval(() => this.props.dispatch(getSensorData(this.props.path, this.props.port)), 500)
	}
	componentWillUnmount () {
		clearInterval(this.interval)
	}
	render () {
		return (
			<div style={styles.container}>
				<DropDownMenu
					style={styles.dropDown}
					menuItems={items}
					onChange={this.swapMode.bind(this)} />
				<div> {this.props.value / this.state.divisor} </div>
			</div>
		)
	}
}

export default Motor