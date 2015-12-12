var fs = require('fs')
process.stdin.setEncoding('utf-8')
process.stdin.resume()
process.stdin.on('data', function (data) {
	var string = fs.readFileSync(data, 'utf-8')
	eval(string)
})