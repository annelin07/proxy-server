# Proxy Server

This is a Proxy Server for Node.js submitted as the [pre-work](http://courses.codepath.com/snippets/intro_to_nodejs/prework) requirement for CodePath.

Time spent: [8hrs, including setting up environment, coding, testing, recording using LICEcap]

##Completed:

* [done] Required: Requests to port `8000` are echoed back with the same HTTP headers and body
* [done] Required: Requests/reponses are proxied to/from the destination server
* [done] Required: The destination server is configurable via the `--host`, `--port`  or `--url` arguments
* [done] Required: The destination server is configurable via the `x-destination-url` header
* [done] Required: Client requests and respones are printed to stdout
* [done] Required: The `--logfile` argument outputs all logs to the file specified instead of stdout
* [done] Optional: The `--exec` argument proxies stdin/stdout to/from the destination program
* [todo] Optional: The `--loglevel` argument sets the logging chattiness
* [todo] Optional: Supports HTTPS
* [todo] Optional: `-h` argument prints CLI API

![Video Walkthrough](https://github.com/annelin07/proxy-server/blob/master/proxy-server-record.gif)