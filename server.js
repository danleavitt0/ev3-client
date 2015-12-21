#!/usr/bin/env node

var express = require('express')
var bodyParser = require('body-parser')
var fs = require('fs')
var ip = require('ip')
var cors = require('cors')
var path = require('path')
var livereload = require('express-livereload')
var spawn = require('child_process').spawn
var app = express()
var MoveSteering = require('move-steering')
var devices = require('ev3-js-devices')
var node = createNode()

var ports = ['a', 'b', 'c', 'd', 1, 2, 3, 4]

app.use(cors())
app.use(bodyParser.json())
app.use('/static', express.static(__dirname + '/public'))

app.post('/file.edit/:name', function (req, res) {
  fs.readFile(__dirname + '/files/' + req.params.name, 'utf-8', function (err, data) {
    if (err)  return res.send('var MoveSteering = require(\'move-steering\')')
    res.send(data)
  })
})

app.post('/file.save', function (req, res) {
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

app.post('/file.stop', function (req, res) {
  node.kill('SIGINT')
  MoveSteering().stop()
  node = createNode()
  res.json({
    ok: true,
    message: 'Run stopped'
  })
})

app.post('/file.run', function (req, res) {
  var file = __dirname + '/files/' + req.body.fileName
  node.stdin.write(file)
  res.json({ok: true})
})

app.post('/file.getAll', function (req, res) {
  fs.readdir(__dirname + '/files', function (err, data) {
    if (err) {
      console.warn(err)
    }
    res.send(JSON.stringify(data))
  })
})

app.post('/sensor.mode', function (req, res) {
  var writePath = path.join(req.body.path, 'mode')
  fs.writeFile(writePath, req.body.mode, function (err) {
    if (err) {
      res.json({ 
        ok: false,
        msg: err
      })
    } else {
      res.json({ ok: true })
    }
  })
})

app.post('/sensors.data', function (req, res) {
  var currentDevices = ports.reduce(function (obj, port) {
    try {
      var path = devices(port)
      obj[port] = {
        path: path,
        type: fs.readFileSync(path + '/driver_name', 'utf-8').trim(),
        value: fs.readFileSync(path + '/value0', 'utf-8').trim(),
        mode: fs.readFileSync(path + '/mode', 'utf-8').trim()
      }
    } catch (e) {
      obj[port] = {
        type: 'No device connected'
      }
    }
    return obj
  }, {})
  currentDevices['1'] = {
    path: '/sys/class/lego-sensor/lego-ev3-color',
    type: 'lego-ev3-color',
    mode: 'COL-COLOR',
    value: 4
  }
  res.json({
    ok: true,
    currentDevices: currentDevices
  })
})

app.get('*', function (req, res) {
  res.sendfile(__dirname + '/public/index.html')
})

function createNode () {
  var n = spawn('node', ['run.js'])
  n.stdout.setEncoding('utf-8')
  n.stdout.on('data', function (data) {
    console.log('output:', data)
  })
  n.stderr.on('data', function (data) {
    console.log('There was an error: ' + data)
  })
  return n
}

var port = process.env.port || 3000
livereload(app, config={watchDir: process.cwd() + "/public"})
console.log('In your browser, navigate to ' + ip.address() + ':' + port)
app.listen(port)
