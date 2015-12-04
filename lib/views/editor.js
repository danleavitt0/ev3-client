import React, {Component} from 'react'
import AceEditor from 'react-ace'
import brace from 'brace'
import MainLayout from '../layouts/main'
import {RaisedButton} from 'material-ui/lib'

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
		zIndex:1
	}
}

class Editor extends Component {
	constructor (props) {
		super(props)
		this.state = {
			text: props.file
		}
	}
	componentWillReceiveProps (nextProps) {
		this.setState({
			text: nextProps.file
		})
	}
	save (e) {
		fetch('http://localhost:3000/save', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name: this.props.title,
				text: this.state.text
			})
		})
	}
	onChange (code) {
		this.setState({
			text: code
		})
	}
	render () {
		return (
			<MainLayout name={this.props.title}>
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
						label='Save' />
				</div>
			</MainLayout>
		)
	}
}

export default Editor
