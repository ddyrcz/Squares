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
            var newPosition = squarePositions.red.right - SHIFT
            if (newPosition >= 0) {
                squarePositions.red.right = newPosition;
                position = squarePositions.red.right;
            }
        } else if (movementType == 'left') {
            var newPosition = squarePositions.red.right + SHIFT
            if (parseInt(board.width) >= newPosition + 20) {
                squarePositions.red.right = newPosition;
                position = squarePositions.red.right;
            }
        } else if (movementType == 'up') {
            var newPosition = squarePositions.red.top - SHIFT;
            if (newPosition >= 0) {
                squarePositions.red.top = newPosition;
                position = squarePositions.red.top;
            }

        } else if (movementType == 'down') {
            var newPosition = squarePositions.red.top + SHIFT;
            if (parseInt(board.height) >= newPosition + 20) {
                squarePositions.red.top = newPosition;
                position = squarePositions.red.top;
            }
        }
    } else {
        if (movementType == 'right') {
            var newPosition = squarePositions.green.right - SHIFT
            if (newPosition >= 0) {
                squarePositions.green.right = newPosition;
                position = squarePositions.green.right;
            }
        } else if (movementType == 'left') {
            var newPosition = squarePositions.green.right + SHIFT
            if (parseInt(board.width) >= newPosition + 20) {
                squarePositions.green.right = newPosition;
                position = squarePositions.green.right;
            }
        } else if (movementType == 'up') {
            var newPosition = squarePositions.green.top - SHIFT;
            if (newPosition >= 0) {
                squarePositions.green.top = newPosition;
                position = squarePositions.green.top;
            }

        } else if (movementType == 'down') {
            var newPosition = squarePositions.green.top + SHIFT;
            if (parseInt(board.height) >= newPosition + 20) {
                squarePositions.green.top = newPosition;
                position = squarePositions.green.top;
            }
        }
    }

    return position;
}