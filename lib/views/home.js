import React, {Component} from 'react'
import {AppBar, List, ListItem, RaisedButton, FlatButton, Dialog, TextField} from 'material-ui/lib'
import Project from '../components/project'
import {connect} from 'react-redux'
import MainLayout from '../layouts/main'
import Nav from '../components/nav'
import {setNewUrl} from '../../actions/actions'

const style = {
  cardList: {
    width: '80%',
    margin: '0 auto'
  },
  button: {
    position: 'absolute',
    top: 20,
    zIndex: 999,
    right: 40
  },
  label: {
    marginRight: 15
  }
}

class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
      projects: [],
      showDialog: false
    }
  }
  componentWillMount () {
    fetch('/file.getAll', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(response => response.json())
      .then(text => this.setState({projects: text}))
      .catch(err => console.warn(err))
  }
  createFile () {
    this.setState({
      showDialog: true
    })
  }
  _onDialogCancel () {
    this.setState({
      showDialog: false
    })
  }
  _onDialogSubmit () {
    this.props.dispatch(setNewUrl('/edit/' + this.refs.name.getValue()))
  }
  render () {
    const projects = this.state.projects
      ? this.state.projects.map((project, i) => <Project name={project} key={'project-' + i}/>)
      : null
    const standardActions = [
      { text: 'Cancel', onTouchTap: this._onDialogCancel.bind(this) },
      { text: 'Submit', onTouchTap: this._onDialogSubmit.bind(this), ref: 'submit' }
    ]
    return (
      <MainLayout nav={<Nav title={'EV3.js'} iconRight={<FlatButton onClick={this.createFile.bind(this)} label="Create" />}/>}>
        <div style={style.cardList}>
          <List>
            {projects}
          </List>
        </div>
        <Dialog
          open={this.state.showDialog}
          ref='create'
          actions={standardActions}>
          <label style={style.label}>Name Program:</label>
          <TextField ref='name'/>
        </Dialog>
      </MainLayout>
    )
  }
}

export default Home
