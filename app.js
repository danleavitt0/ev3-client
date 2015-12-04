import React, {Component} from 'react'
import router from './router'
import Home from './lib/views/home'
import {connect} from 'react-redux'
import {initializeApp} from './actions'

function mapStateToProps (state) {
  return {
    url: state.url,
    file: state.file,
    state: state
  }
}

function mapDispatchToProps (dispatch) {
  return {
    dispatch: (fn) => dispatch(fn)
  }
}

class App extends Component {
  constructor (props) {
    super(props)
  }
  componentWillMount () {
    this.props.dispatch(initializeApp())
  }
  render () {
    return router(this.props.url || '/', this.props)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
