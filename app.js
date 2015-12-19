import React, {Component} from 'react'
import router from './router'
import Home from './lib/views/home'
import {connect} from 'react-redux'
import {initializeApp} from './actions/initialize'

function mapStateToProps (state) {
  const {serverReducer, sensorReducer} = state
  return {
    url: serverReducer.url,
    file: serverReducer.file,
    sensors: sensorReducer,
    state: serverReducer
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
