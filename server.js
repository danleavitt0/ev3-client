var express = require('express')
var bodyParser = require('body-parser')
var fs = require('fs')
var app = express()

app.use(bodyParser.json())
app.use('/static', express.static(__dirname + '/public'))

app.use(function (req, res, next) {
  console.log(req.body)
  next()
})

app.get('/edit/:name', function (req, res) {
  fs.readFile(__dirname + '/public/' + req.params.name, 'utf-8', function (err, data) {
    if (err) console.warn(err)
    res.send(data)
  })
})

app.post('/save', function (req, res) {
  console.log(req.body)
  // fs.writeFile(
  //   __dirname + '/public/' + req.body.name,
  //   req.body.text,
  //   function (err, data) {
  //     if (err) {
  //       console.log(err)
  //     }
  //     console.log(data)
  //   })
})

app.get('/getFiles', function (req, res) {
  fs.readdir(__dirname + '/public', function (err, data) {
    if (err) {
      console.warn(err)
    }
    res.send(JSON.stringify(data))
  })
})

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/public/index.html')
})

app.listen(process.env.port || 3000)
