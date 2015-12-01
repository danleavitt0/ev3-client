var express = require('express')
var bodyParser = require('body-parser')
var fs = require('fs')
var app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/static', express.static(__dirname + '/public'))

app.use(function (req, res, next) {
  console.log(req.body)
  next()
})

app.post('/save', function (req, res) {
  fs.writeFile(
    'test.js',
    'function runner () {\n' + req.body.code + '\n}\nmodule.exports = runner()',
    function (err, data) {
      if (err) {
        console.log(err)
      }
  })
  res.send(req.body)
})

app.get('/run', function (req, res) {
  fs.readFile('test.js', 'utf8', function(err, data) {
    if (err) {
      console.warn(err)
    }
    res.send(data)
  })
})

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/public/index.html')
})

app.listen(process.env.port || 3000)
