import React, {Component} from 'react'
import {AppBar, List, ListItem, RaisedButton, FlatButton, Dialog, TextField} from 'material-ui/lib'
import Project from '../components/project'
import {connect} from 'react-redux'
import MainLayout from '../layouts/main'
import Nav from '../components/nav'
import {setNewUrl, startPull, connectEV3} from '../../actions/actions'
import {getFileList} from '../../actions/initialize'

const styles = {
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
  },
  content: {
    display: 'flex',
    alignItems: 'center'
  }
}

class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showDialog: false,
      errorText: '',
      showApiDialog: false
    }
  }
  createFile () {
    this.setState({
      showDialog: true
    })
    setTimeout(() => this.refs.name.focus())
  }
  componentDidMount () {
    if (this.props.apiUrl) {
      this.props.dispatch(getFileList(this.props.apiUrl))
    }
  }
  connectApi () {
    this.setState({
      showApiDialog: true
    })
    setTimeout(() => this.refs.apiUrl.focus())
  }
  pullButtonClick () {
    this.props.dispatch(startPull())
  }
  resetDialogs () {
    this.setState({
      showDialog: false,
      showApiDialog: false,
      errorText: ''
    })
  }
  _onDialogSubmit () {
    if (this.state.showDialog) {
      this.props.dispatch(setNewUrl('/edit/' + this.refs.name.getValue()))
    } else if (this.state.showApiDialog) {
      this.props.dispatch(connectEV3(this.refs.apiUrl.getValue()))
    }
    this.resetDialogs()
  }
  _handleTextChange (e) {
    let errorText = e.target.value.match(/\s/g) ? 'No spaces allowed' : ''
    this.setState({
      errorText: ''
    })
  }
  render () {
    const files = this.props.files && this.props.files.length > 0
      ? this.props.files.map((project, i) => <Project name={project} key={'project-' + i}/>)
      : <ListItem>No projects found</ListItem>
    const standardActions = [
      <FlatButton key={0} secondary={true} label='Cancel' onTouchTap={this.resetDialogs.bind(this)} />,
      <FlatButton key={1} primary={true} label='Submit' onTouchTap={this._onDialogSubmit.bind(this)} ref='submit' disabled={this.state.errorText.length > 0 }/>
    ]
    const mainButton = this.props.apiUrl
      ? <FlatButton onClick={this.createFile.bind(this)} label="Create" />
      : <FlatButton onClick={this.connectApi.bind(this)} label="Connect" />
    return (
      <MainLayout nav={<Nav title={'EV3.js'} iconRight={mainButton}/>}>
        <FlatButton onClick={this.pullButtonClick.bind(this)} label="Pull Updates" />
        <div style={styles.cardList}>
          <List>
            {files}
          </List>
        </div>
        <Dialog
          open={this.state.showDialog}
          ref='create'
          actions={standardActions}
          bodyStyle={styles.content} >
          <label style={styles.label}>Name Program:</label>
          <TextField
            onChange={this._handleTextChange.bind(this)}
            errorText={this.state.errorText}
            ref='name'/>
        </Dialog>
        <Dialog
          open={this.state.showApiDialog}
          ref='apiDialog'
          actions={standardActions}
          bodyStyle={styles.content} >
          <label style={styles.label}>IP Address:</label>
          <TextField
            onChange={this._handleTextChange.bind(this)}
            errorText={this.state.errorText}
            ref='apiUrl'/>
        </Dialog>
      </MainLayout>
    )
  }
}

export default Home
