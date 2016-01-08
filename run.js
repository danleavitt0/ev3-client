var fs = require('fs')
var asyncEval = require('async-eval')
var moment = require('moment')
process.stdin.setEncoding('utf-8')
process.stdin.resume()
process.stdin.on('data', function (data) {
	var string = 'console.log("Started at " + moment().format("MMMM Do YYYY, h:mm:ss a"))\n\n' + fs.readFileSync(data, 'utf-8') + '\nconsole.log("@@@")'
	try {
		eval(string)
	} catch (e) {
		console.log(e)
		console.log('@@@')
	}
})