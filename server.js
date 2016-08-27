const SHIFT = 5;

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
var squarePositions = {
    'red': { 'top': 30, 'right': 400 },
    'green': { 'top': 250, 'right': 30 }
};
var board = {};

io.sockets.on('connection', (socket) => {
    console.log('connection accepted');

    playerNumber += 1;

    socket.on('right', (square) => {
        var position = calculateNewPosition(square, 'right');
        io.sockets.emit('right', { square: square, newPosition: position });
    });

    socket.on('left', (square) => {
        var position = calculateNewPosition(square, 'left');
        io.sockets.emit('left', { square: square, newPosition: position });
    });

    socket.on('down', (square) => {
        var position = calculateNewPosition(square, 'down');
        io.sockets.emit('down', { square: square, newPosition: position });
    });

    socket.on('up', (square) => {
        var position = calculateNewPosition(square, 'up');
        io.sockets.emit('up', { square: square, newPosition: position });
    });

    if (playerNumber > 2) {
        socket.emit('full', 'The server is full');
        return;
    }

    if (squares.green == undefined) {
        squares.green = socket.id;
        assignSquare[socket.id] = 'green';
    } else {
        squares.red = socket.id;
        assignSquare[socket.id] = 'red';
    }
''
    socket.on('board', (data) => {
        board.width = data.width;
        board.height = data.height;
    });

    socket.emit('init', squarePositions);

    var square = assignSquare[socket.id];

    socket.emit('square', square);
});

var calculateNewPosition = function (square, movementType) {
    var position = undefined;
    if (square == 'red') {
        if (movementType == 'right') {
            squarePositions.red.right -= SHIFT;
            position = squarePositions.red.right;
        } else if (movementType == 'left') {
            squarePositions.red.right += SHIFT;
            position = squarePositions.red.right;
        } else if (movementType == 'up') {
            squarePositions.red.top -= SHIFT;
            position = squarePositions.red.top;
        } else if (movementType == 'down') {
            squarePositions.red.top += SHIFT;
            position = squarePositions.red.top;
        }
    } else {
        if (movementType == 'right') {
            squarePositions.green.right -= SHIFT;
            position = squarePositions.green.right;
        } else if (movementType == 'left') {
            squarePositions.green.right += SHIFT;
            position = squarePositions.green.right;
        } else if (movementType == 'up') {
            squarePositions.green.top -= SHIFT;
            position = squarePositions.green.top;
        } else if (movementType == 'down') {
            squarePositions.green.top += SHIFT;
            position = squarePositions.green.top;
        }
    }

    return position;
}