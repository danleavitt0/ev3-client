import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {getLog} from '../../actions/actions'
import isEqual from '@f/equal-obj'

const styles = {
	container: {
		padding: 20
	},
	run: {
		marginBottom: 15
	}
}

class Log extends Component {
	constructor (props) {
		super(props)
	}
	componentDidMount () {
		this.interval = setInterval(() => this.props.dispatch(getLog()), 1000)
	}
	componentWillUnmount () {
		clearInterval(this.interval)
	}
	componentWillReceiveProps (nextProps) {
		if (this.props.log && !isEqual(this.props.log, nextProps.log)) {
			let div = ReactDOM.findDOMNode(this)
			div.scrollTop = div.scrollHeight
			console.log(div.scrollTop)
		}
	}
	render () {
		let log = this.props.log && this.props.log.data.split('@@@')
		return (
			<div style={styles.container}>
				{log && log.map((item, i) => <div style={styles.run} key={i}>
						{item && item.split('\n').map((text, i) => <div key={i}> {text} </div>)}
					</div>)}
			</div>
		)
	}
}

export default Log