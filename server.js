#!/usr/bin/env node

var express = require('express')
var bodyParser = require('body-parser')
var fs = require('fs')
var ip = require('ip')
var spawn = require('child_process').spawn
var app = express()

app.use(bodyParser.json())
app.use('/static', express.static(__dirname + '/public'))

app.post('/edit/:name', function (req, res) {
  fs.readFile(__dirname + '/files/' + req.params.name, 'utf-8', function (err, data) {
    if (err)  return res.send('var MoveSteering = require(\'move-steering\')')
    res.send(data)
  })
})

app.post('/save', function (req, res) {
  fs.writeFile(
    __dirname + '/files/' + req.body.name,
    req.body.text,
    function (err, data) {
      if (err) {
        res.json({ok: false, message: 'Failed to save data, please try again.'})
      }
      res.json({ok: true, message: 'Save Successful'})
    })
})

app.post('/run', function (req, res) {
  var file = __dirname + '/files/' + req.body.fileName
  node.stdin.write(file)
  res.json({ok: true})
})

app.post('/getFiles', function (req, res) {
  fs.readdir(__dirname + '/files', function (err, data) {
    if (err) {
      console.warn(err)
    }
    res.send(JSON.stringify(data))
  })
})

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/public/index.html')
})

var node = spawn('node', ['run.js'])
node.stdout.setEncoding('utf-8')
node.stdout.on('data', function (data) {
  console.log('output:', data)
})
node.stderr.on('data', function (data) {
  console.log('There was an error: ' + data)
})

var port = process.env.port || 3000
console.log('In your browser, navigate to ' + ip.address() + ':' + port)
app.listen(port)
