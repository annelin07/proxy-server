let http = require('http')
let fs = require('fs')
let request = require('request')
let through = require('through')
let argv = require('yargs')
	.default({host: '127.0.0.1'})
    .argv   
let scheme = 'http://'
let port = argv.port || argv.host === '127.0.0.1' ? '8000' : '80'
let destinationUrl = argv.url || scheme + argv.host + ':' + port
let logStream = argv.lf ? fs.createWriteStream(argv.lf) : process.stdout
// logStream.write(JSON.stringify(argv))
// logStream.write(destinationUrl)

http.createServer((req, res) => {
    logStream.write('\nEcho request: \n' + JSON.stringify(req.headers) + '\n')
    for (let header in req.headers) {
	    res.setHeader(header, req.headers[header])
	}
    through(req, logStream, {autoDestroy: false})
    req.pipe(res)
 }).listen(8000);

logStream.write("\nlistening at http://127.0.0.1:8001")

http.createServer((req, res) => {
	destinationUrl = req.headers['x-desination-url'] || destinationUrl
	let options = {
		method: req.method,
    	headers: req.headers,
    	 url: `http://${destinationUrl}${req.url}`
	}

	logStream.write('\nProxying request to: ' + destinationUrl + req.url + '\n')
    through(req, logStream, {autoDestroy: false})

	let downstreamResponse = req.pipe(request(options))
	logStream.write(JSON.stringify(downstreamResponse.headers))
	downstreamResponse.pipe(res)
    through(downstreamResponse, logStream, {autoDestroy: false})

}).listen(8001);


