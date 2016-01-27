#!/usr/bin/env node

var express = require('express')
var bodyParser = require('body-parser')
var fs = require('fs')
var cors = require('cors')
var path = require('path')
var app = express()
var request = require('request')
var http = require('http').Server(app)

var apiUrl

app.use(cors())
app.use(bodyParser.json())
app.use('/static', express.static(__dirname + '/public'))


var router = express.Router()

router.route('/connect')
  .post(function (req, res) {
    request({
      url: 'http://' + req.body.url + '/ping',
      method: 'POST',
      json: true
    }, function (err, response, body) {
      if (err) {
        return res.json({ok: false})
      } else {
        apiUrl = 'http://' + req.body.url
        return res.json({ok: true, url: apiUrl})
      }
    })
  })

router.route('/file.get/:name')
  .post(function (req, res) {
    request({
      url: apiUrl + req.route.path,
      method: 'POST',
      json: true,
      body: {name: req.params.name}
    }, function (err, response, body){
      res.send(body)
    })
  })

router.route('/log.get')
  .post(function (req, res) {
    request({
      url: apiUrl + req.route.path,
      method: 'POST',
      json: true
    }, function (err, response, body){
      res.send(body)
    })
  })

router.route('/log.clear')
  .post(function (req, res) {
    request({
      url: apiUrl + req.route.path,
      method: 'POST',
      json: true
    }, function (err, response, body){
      res.send(body)
    })
  })

router.route('/file.save')
  .post(function(req, res) {
    request({
      url: apiUrl + req.route.path,
      method: 'POST',
      json: true,
      body: req.body
    }, function (err, response, body){
      res.send(body)
    })
  })

router.route('/file.stop')
  .post(function (req, res) {
    request({
      url: apiUrl + req.route.path,
      method: 'POST',
      json: true
    }, function (err, response, body){
      res.send(body)
    })
  })

router.route('/file.run')
  .post(function (req, res) {
    request({
      url: apiUrl + req.route.path,
      method: 'POST',
      json: true,
      body: req.body
    }, function (err, response, body){
      res.send(body)
    })
  })

router.route('/file.getAll')
  .post(function (req, res) {
    request({
      url: apiUrl + req.route.path,
      method: 'POST',
      json: true
    }, function (err, response, body){
      res.send(body)
    })
  })

router.route('/sensor.data')
  .post(function (req, res) {
    request({
      url: apiUrl + req.route.path,
      method: 'POST',
      json: true,
      body: req.body
    }, function (err, response, body){
      res.send(body)
    })
  })

router.route('/sensor.mode')
  .post(function (req, res) {
    request({
      url: apiUrl + req.route.path,
      method: 'POST',
      json: true,
      body: req.body
    }, function (err, response, body){
      res.send(body)
    })
  })

router.route('/sensors.find')
  .post(function (req, res) {
    request({
      url: apiUrl + req.route.path,
      method: 'POST',
      json: true
    }, function (err, response, body){
      res.send(body)
    })
  })

router.route('/source.update')
  .post(function (req, res) {
    request({
      url: apiUrl + req.route.path,
      method: 'POST',
      json: true
    }, function (err, response, body){
      res.send(body)
    })
  })

app.use(router)

app.get('*', function (req, res) {
  res.sendFile(__dirname + '/public/index.html')
})


var port = process.env.PORT || 3000
http.listen(port) 
