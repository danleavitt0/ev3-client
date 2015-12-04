import React, {Component} from 'react'
import {AppBar} from 'material-ui/lib'
import Project from '../components/project'
import {connect} from 'react-redux'
import {changeUrl} from '../../actions'
import MainLayout from '../layouts/main'

const style = {
  cardList: {
    display: 'flex',
    alignItems: 'center',
    alignContent: 'center',
    flexWrap: 'wrap',
    width: '80%',
    margin: '0 auto'
  }
}

class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {projects: []}
  }
  componentWillMount () {
    fetch('http://localhost:3000/getFiles', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(response => response.json())
      .then(text => this.setState({projects: text}))
      .catch(err => console.warn(err))
  }
  render () {
    const projects = this.state.projects
      ? this.state.projects.map((project, i) => <Project name={project} key={'project-' + i}/>)
      : null
    return (
      <MainLayout name={'EV3.js'}>
        <div style={style.cardList}>
          {projects}
        </div>
      </MainLayout>
    )
  }
}

export default Home
