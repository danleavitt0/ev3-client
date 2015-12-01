import React, {Component} from 'react'
import brace from 'brace'
import AceEditor from 'react-ace'

require('brace/mode/javascript')
require('brace/theme/github')

class App extends Component {
  onChange (e) {
    fetch('http://localhost:3000/save', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        code: e
      })
    }).then(response => response.text())
      .then(responseText => console.log(responseText))
      .catch(err => console.warn(err))
  }
  buttonClick (e) {
    fetch('http://localhost:3000/run', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    }).then(response => response.text())
      .then(text => eval(text))
      .catch(err => console.warn(err))
  }
  render () {
    return (
      <div>
        <div>
          Header
        </div>
        <button onClick={this.buttonClick}>Run</button>
        <AceEditor
          mode='javascript'
          theme='github'
          name='editor'
          onChange={this.onChange}
        />
      </div>
    )
  }
}

export default App
