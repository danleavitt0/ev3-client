import React, {Component} from 'react'
import AceEditor from 'react-ace'
import brace from 'brace'
import Split from '../layouts/split'
import SensorReadOut from '../components/sensorReadOut'
import {RaisedButton, Snackbar, FlatButton, IconButton, FontIcon} from 'material-ui/lib'
import Button from '../components/button'
import {startSave, startRun, stop} from '../../actions'
import Nav from '../components/nav'

require('brace/mode/javascript')
require('brace/theme/monokai')

const styles = {
	buttonContainer: {
		marginTop: -3,
		zIndex: 1
	},
	button: {
		zIndex:1,
		margin: 10
	},
	font: {
		fontFamily: 'Roboto, sans-serif'
	}
}

class Editor extends Component {
	constructor (props) {
		super(props)
		this.state = {
			text: props.file,
			saving: false,
			dirty: false,
			running: false,
			message: props.message
		}
	}
	componentWillReceiveProps (nextProps) {
		if (nextProps.message) {
			this.refs.message.show()
		}
		return this.setState({
			saving: nextProps.state.saving,
			running: nextProps.state.running,
			message: nextProps.message
		})
	}
	save (e) {
		this.props.dispatch(startSave(this.props.title, this.state.text))
		return this.setState({
			dirty: false
		})
	}
	run (e) {
		return this.props.dispatch(startRun(this.props.title))
	}
	stop () {
		return this.props.dispatch(stop())
	}
	onChange (code) {
		this.setState({
			text: code,
			dirty: true
		})
	}
	render () {
		var buttonContainer = <div style={styles.buttonContainer}>
					<RaisedButton
						onClick={this.save.bind(this)}
						style={styles.button}
						primary={true}
						label='Save'
						disabled={this.state.saving || !this.state.dirty} />
					<RaisedButton
						onClick={this.run.bind(this)}
						style={styles.button}
						label='Run' 
						disabled={this.state.running} />
					<RaisedButton
						onClick={this.stop.bind(this)}
						style={styles.button}
						label='Stop'
						disabled={!this.state.running} />
				</div>
		return (
			<div>
				<Split 
					nav={
						<Nav 
							title={this.props.title}
							iconLeft={<Button/>}
							iconStyleRight={styles.buttonContainer}
							iconRight={buttonContainer} />
						}
					left={
						<AceEditor
							style={{position: 'fixed'}}
		          mode='javascript'
		          theme='monokai'
		          name='brace-editor'
		          onChange={this.onChange.bind(this)}
		          value={this.state.text}
		          height={'100%'}
		          width={'100%'}
		          ref='editor'
		          tabSize={2}
		          showPrintMargin={false} />
		        }
	        right={<SensorReadOut/>} />
				<Snackbar
					style={styles.font}
					ref='message'
					message={this.state.message} />
			</div>
		)
	}
}

export default Editor
