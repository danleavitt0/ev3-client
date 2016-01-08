#!/usr/bin/env node

var express = require('express')
var bodyParser = require('body-parser')
var fs = require('fs')
var ip = require('ip')
var cors = require('cors')
var path = require('path')
var livereload = require('express-livereload')
var spawn = require('child_process').spawn
var MoveSteering = require('move-steering')
var devices = require('ev3-js-devices')
var moment = require('moment')

var node = createNode()
var app = express()

var ports = ['a', 'b', 'c', 'd', 1, 2, 3, 4]

app.use(cors())
app.use(bodyParser.json())
app.use('/static', express.static(__dirname + '/public'))

app.post('/file.get/:name', function (req, res) {
  fs.readFile(__dirname + '/files/' + req.params.name, 'utf-8', function (err, data) {
    if (err)  return res.send('var MoveSteering = require(\'move-steering\')')
    res.send(data)
  })
})

app.post('/log.get', function (req,res) {
  var file = fs.readFileSync('log.txt', 'utf-8')
  res.json({ok: true, data: file})
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
  try {
    MoveSteering().reset()
  } catch (e) {
    console.warn('no motors attached')
  }
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

app.post('/sensor.data', function (req, res) {
  var readPath = path.join(req.body.path, req.body.ext || 'value0')
  fs.readFile(readPath, 'utf-8', function (err, data) {
    if (err) {
      res.json({
        ok: false,
        msg: err
      })
    } else {
      res.json({
        ok: true,
        data: {
          value: data.trim(),
          port: req.body.port
        }
      })
    }
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

app.post('/sensors.find', function (req, res) {
  var currentDevices = ports.reduce(function (obj, port) {
    try {
      var path = devices(port)
      obj[port] = {
        path: path,
        type: fs.readFileSync(path + '/driver_name', 'utf-8').trim()
      }
    } catch (e) {
      obj[port] = {
        type: 'No device connected'
      }
    }
    return obj
  }, {})
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
  n.stderr.setEncoding('utf-8')
  n.stdout.on('data', function (data) {
    fs.appendFileSync('log.txt', data)
  })
  n.stderr.on('data', function (data) {
    fs.appendFileSync('log.txt', '@@@\n')
  })
  return n
}

var port = process.env.port || 3000
console.log('In your browser, navigate to ' + ip.address() + ':' + port)
app.listen(port)
