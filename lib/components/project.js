import React, {Component} from 'react'
import {merge} from '../utils'
import {changeUrl} from '../../actions'
import {
	Card,
	CardActions,
	CardExpandable,
	CardHeader,
	CardMedia,
	CardText,
	CardTitle
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
		this.state = {hover: false}
	}
	mouseOver () {
		this.setState({
			hover: true
		})
	}
	mouseOut () {
		this.setState({
			hover: false
		})
	}
	render () {
		return (
			<a style={style.link} href={'edit/' + this.props.name}>
				<Card 
					onMouseOver={this.mouseOver.bind(this)}
					onMouseOut={this.mouseOut.bind(this)}
					style={merge(this.state.hover && style.hover, style.card)}
				>
					<CardTitle title={this.props.name}/>
				</Card>
			</a>
		)
	}
}

export default Project