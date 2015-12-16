import React, {Component} from 'react'
import AceEditor from 'react-ace'
import brace from 'brace'
import MainLayout from '../layouts/main'
import {RaisedButton, Snackbar, FlatButton, IconButton, FontIcon} from 'material-ui/lib'
import Button from '../components/button'
import {startSave, startRun} from '../../actions'
import Nav from '../components/nav'

require('brace/mode/javascript')
require('brace/theme/monokai')

const styles = {
	buttonContainer: {
		position: 'absolute',
		top: '80px',
		right: '20px',
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
			message: props.message
		}
	}
	componentWillReceiveProps (nextProps) {
		if (nextProps.message) {
			this.refs.message.show()
		}
		return this.setState({
			saving: nextProps.state.saving,
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
	onChange (code) {
		this.setState({
			text: code,
			dirty: true
		})
	}
	render () {
		console.log(this.state)
		return (
			<MainLayout nav={<Nav title={this.props.title} iconLeft={<Button/>}/>}>
				<AceEditor
					style={{position: 'fixed'}}
          mode='javascript'
          theme='monokai'
          name='editor'
          onChange={this.onChange.bind(this)}
          value={this.state.text}
          height={'100vh'}
          width={'100vw'}
          ref='editor'
        />
        <div style={styles.buttonContainer}>
					<RaisedButton
						onClick={this.save.bind(this)}
						style={styles.button}
						primary={true}
						label='Save'
						disabled={this.state.saving || !this.state.dirty} />
					<RaisedButton
						onClick={this.run.bind(this)}
						style={styles.button}
						secondary={true}
						label='Run' />
				</div>
				<Snackbar
					style={styles.font}
					ref='message'
					message={this.state.message} />
			</MainLayout>
		)
	}
}

export default Editor
