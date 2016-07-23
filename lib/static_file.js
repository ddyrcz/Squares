var fs = require('fs'),
	mime = require('mime'),
	path = require('path');

var notFound = function (res) {
	res.writeHead(404, { "content-type": "text/plain" });
	res.end('404 not found');
}

var cache = {};

var sendFile = function (res, filePath, data) {
	res.writeHead(200, { "content-type": mime.lookup(path.basename(filePath)) });
	res.end(data);
}

var manageFilePath = function (url) {
	if (url === '/') {
		return 'public/index.html';
	} else {
		return 'public' + url;
	}
}

exports.serveStaticFile = function (url, res) {

	var filePath = manageFilePath(url);

	if (cache[filePath]) {
		console.log(`${filePath} loaded from cache`);
		sendFile(res, filePath, cache[filePath]);
	} else {
		fs.readFile(filePath, (err, data) => {
			if (err) {
				notFound(res);
			} else {
				cache[filePath] = data;
				console.log(`${filePath} loaded`);
				sendFile(res, filePath, data);
			}
		});
	}
}