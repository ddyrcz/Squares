var http = require('http'),
    staticFile = require('./lib/static_file'),
    socketio = require('socket.io');

var server = http.createServer((req, res) => {
    if (req.method === 'GET') {
        staticFile.serveStaticFile(req.url, res);
    }
}).listen(8000);

var io = socketio.listen(server);

io.sockets.on('connection', (socket) => {
    console.log('connection accepted');
});