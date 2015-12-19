import React, {Component} from 'react'
import {merge} from '../utils'
import {changeUrl} from '../../actions/actions'
import {
	ListItem,
	ListDivider
} from 'material-ui/lib'

const style = {
	card: {
		margin: 20,
		cursor: 'pointer'
	},
	hover: {
		boxShadow: '0 4px 6px rgba(0, 0, 0, 0.12), 0 4px 4px rgba(0, 0, 0, 0.24)'
	},
	link: {
		color: 'inherit',
		textDecoration: 'none'
	}
}

class Project extends Component {
	constructor (props) {
		super(props)
	}
	render () {
		return (
			<div>
				<ListItem href={"/edit/" + this.props.name}>
					{this.props.name}
				</ListItem>
			</div>
		)
	}
}

export default Project
