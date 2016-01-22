import React, {Component} from 'react'
import {IconButton, FontIcon} from 'material-ui/lib'
import ArrowBack from 'material-ui/lib/svg-icons/navigation/arrow-back'
import {merge} from '../utils'

const style = {
	button: {
		color: 'white'
	}
}

class Button extends Component {
	render () {
		return (
			<IconButton onClick={() => history.back()}>
				<ArrowBack color={'white'}/>
			</IconButton>
		)
	}
}

export default Button