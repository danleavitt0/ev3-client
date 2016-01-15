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
var app = express()
var http = require('http').Server(app)
var parsetrace = require('parsetrace')

var ports = ['a', 'b', 'c', 'd', 1, 2, 3, 4]

app.use(cors())
app.use(bodyParser.json())
app.use('/static', express.static(__dirname + '/public'))

var node

app.post('/file.get/:name', function (req, res) {
  fs.readFile(__dirname + '/files/' + req.params.name, 'utf-8', function (err, data) {
    if (err)  return res.send('var MoveSteering = require(\'move-steering\')')
    res.send(data)
  })
})

app.post('/log.get', function (req,res) {
  try {
    fs.existsSync(__dirname + '/log.txt')
  } catch (e) {
    fs.writeFileSync(__dirname + '/log.txt', '')
  }
  var file = fs.readFileSync('log.txt', 'utf-8')
  res.json({ ok: true, data: file })
})

app.post('/file.save', function (req, res) {
  try {
    fs.existsSync(__dirname + '/files/')
  } catch (e) {
    fs.mkdirSync(__dirname + '/files/')
  }
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
  node.kill()
  try {
    MoveSteering().reset()
  } catch (e) {
    console.warn('no motors attached')
  }
  res.json({
    ok: true
  })
})

app.post('/file.run', function (req, res) {
  var file = __dirname + '/files/' + req.body.fileName
  if (node) {
    node.kill()
  }
  node = createNode(file)
  node.on('exit', function () {
    res.json({ok: true, message: 'Run finished'})
  })
})

app.post('/file.getAll', function (req, res) {
  fs.readdir(__dirname + '/files', function (err, data) {
    if (err) {
      res.send({text: ''})
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

app.post('/source.update', function (req, res) {
  var update = spawn('git', ['pull'])
  update.stderr.setEncoding('utf-8')
  update.stdout.setEncoding('utf-8')
  update.stderr.on('data', function(data) {
    console.log('error', data)
  })
  update.stdout.on('data', function(data) {
    console.log('message', data)
  })
  update.on('exit', function (msg) {
    res.json({ ok: true, message: 'Pull finished' })
  })
})

function createNode (file) {
  var n = spawn('node', [file])
  n.stdout.setEncoding('utf-8')
  n.stderr.setEncoding('utf-8')
  n.stdout.on('data', function (data) {
    fs.appendFileSync('log.txt', data)
  })
  n.stderr.on('data', function (data) {
    var split = data.split('\n\n')
    var trace = parsetrace({stack: split[1]}).object()
    var err = [
      'Error: ' + trace.error,
      trace.frames[0].file.slice((__dirname + '/files/').length),
      'Line: ' + trace.frames[0].line,
      '\n'
    ].join('\n')
    fs.appendFileSync('log.txt', err)
  })
  return n
}

app.get('*', function (req, res) {
  res.sendfile(__dirname + '/public/index.html')
})


var port = process.env.port || 3000
http.listen(port, function () {
  console.log('In your browser, navigate to ' + ip.address() + ':' + port)
})
