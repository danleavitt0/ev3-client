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
		console.log(props)
		this.state = {
			text: props.file
		}
	}
	componentWillReceiveProps (nextProps) {
		console.log('newprops')
		this.setState({
			text: nextProps.file
		})
	}
	save () {
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