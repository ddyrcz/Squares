var http = require('http'),
    staticFile = require('./lib/static_file'),
    socketio = require('socket.io');

var server = http.createServer((req, res) => {
    if (req.method === 'GET') {
        staticFile.serveStaticFile(req.url, res);
    }
}).listen(8000);

var io = socketio.listen(server);
var squares = {};
var playerNumber = 0;
var assignSquare = {};

io.sockets.on('connection', (socket) => {
    console.log('connection accepted');

    playerNumber += 1;

    socket.on('right', (square) => {
        io.sockets.emit('right', square);
    });

    socket.on('left', (square) => {
        io.sockets.emit('left', square);
    });

    socket.on('down', (square) => {
        io.sockets.emit('down', square);
    });

    socket.on('up', (square) => {
        io.sockets.emit('up', square);
    });

    if(playerNumber > 2){
        socket.emit('full', 'The server is full');
        return;
    }    

    if(squares.green == undefined){
        squares.green = socket.id;  
        assignSquare[socket.id] = 'green';          
    }else{
        squares.red = socket.id;
        assignSquare[socket.id] = 'red';
    }

    var square = assignSquare[socket.id];
    
    socket.emit('square',square);
});