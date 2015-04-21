let http = require('http')
let fs = require('fs')
let request = require('request')
let argv = require('yargs')
	.default({host: '127.0.0.1', port: '8000', url: '127.0.0.1:8000', log: 'proxy-server.log'})
    .argv   
let scheme = 'http://'
let port = argv.port || argv.host === '127.0.0.1' ? '8000' : '80'
let destinationUrl = argv.url || scheme + argv.host + ':' + port
let logStream = argv.log ? fs.createWriteStream(argv.log) : process.stdout

http.createServer((req, res) => {
    logStream.write('\nRequest received at: ' + req.url)
    for (let header in req.headers) {
	    res.setHeader(header, req.headers[header])
	}
	logStream.write('\n' + JSON.stringify(req.headers) + '\n')
	req.pipe(logStream)
    req.pipe(res)
}).listen(8000);


http.createServer((req, res) => {
	logStream.write('\nProxying request to: ' + destinationUrl + req.url)
	destinationUrl = req.headers['x-desination-url'] || destinationUrl
	let options = {
		method: req.method,
    	headers: req.headers,
    	 url: `http://${destinationUrl}${req.url}`
	}

	let downstreamResponse = req.pipe(request(options))
	logStream.write('\nProxying request:\n:' + JSON.stringify(downstreamResponse.headers))
	//downstreamResponse.pipe(logStream)
	downstreamResponse.pipe(res)

}).listen(8001);


