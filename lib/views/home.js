import React, {Component} from 'react'
import {AppBar, List, ListItem, RaisedButton, FlatButton, Dialog, TextField} from 'material-ui/lib'
import Project from '../components/project'
import {connect} from 'react-redux'
import MainLayout from '../layouts/main'
import Nav from '../components/nav'
import {setNewUrl, startPull} from '../../actions/actions'

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
      showDialog: false
    }
  }
  createFile () {
    this.setState({
      showDialog: true
    })
  }
  pullButtonClick () {
    this.props.dispatch(startPull())
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
    const files = this.props.files && this.props.files.length > 0
      ? this.props.files.map((project, i) => <Project name={project} key={'project-' + i}/>)
      : <ListItem>No files found</ListItem>
    const standardActions = [
      { text: 'Cancel', onTouchTap: this._onDialogCancel.bind(this) },
      { text: 'Submit', onTouchTap: this._onDialogSubmit.bind(this), ref: 'submit' }
    ]
    return (
      <MainLayout nav={<Nav title={'EV3.js'} iconRight={<FlatButton onClick={this.createFile.bind(this)} label="Create" />}/>}>
        <FlatButton onClick={this.pullButtonClick.bind(this)} label="Pull Updates" />
        <div style={style.cardList}>
          <List>
            {files}
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
