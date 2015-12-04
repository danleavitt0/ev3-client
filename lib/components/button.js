import React, {Component} from 'react'
import {IconButton, FontIcon} from 'material-ui/lib'
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
				<FontIcon color={'white'} className="material-icons">arrow_back</FontIcon>
			</IconButton>
		)
	}
}

export default Button