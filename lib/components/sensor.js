import React, {Component} from 'react'

class Sensor extends Component {
	constructor (props) {
		super(props)
		this.state = {
			data: '',
			mode: ''
		}
	}
	render () {
		return (
			<div>
				<div>
					<div>
						{this.props.name}
					</div>
					<div>
						{this.props.port}
					</div>
				</div>
				<div>
					<div>
						{this.props.value}
					</div>
					<div>
						{this.props.mode}
					</div>
				</div>
			</div>
		)
	}
}

export default Sensor