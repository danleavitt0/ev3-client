import {AppBar} from 'material-ui/lib'
import React, {Component} from 'react'

class Nav extends Component {
	constructor (props) {
		super(props)
	}
	render () {
		let {iconRight, iconLeft} = this.props
		iconRight = iconRight ? iconRight : null
		iconLeft = iconLeft ? iconLeft : <div/>
		return (
			<AppBar
				title={this.props.title}
				iconElementRight={iconRight}
				iconElementLeft={iconLeft} />
		)
	}
}

export default Nav