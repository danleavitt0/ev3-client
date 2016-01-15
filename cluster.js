var spawn = require('child_process').spawn

var nodes = []
for (var i = 0; i < 3; i++) {
	nodes.push(createSpawn())
}
 
var idx = 0
exports.run = function (file) {
	var node = nodes[idx]
	node.stdin.write(file, 'utf-8')
	nodes[idx] = createSpawn()
	idx = (idx + 1) % 3
	return node
}

function createSpawn () {
	return spawn('node', ['run.js'])
}