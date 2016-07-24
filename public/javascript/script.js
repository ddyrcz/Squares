const LEFT_KEY_CODE = 37;
const RIGHT_KEY_CODE = 39;
const UP_KEY_CODE = 38;
const DOWN_KEY_CODE = 40;
var shift = 5;

var socket = io.connect();
var square;

$(document).ready(() => {

    socket.on('square', (currentSquare) => {
        square = currentSquare;
        console.log(square);
    });

    socket.on('full', (err) => {
        console.log(err);
    });

    socket.on('right', (square) => {
        var id = '#' + square;
        var position = parseInt($(id).css('right')) - shift;                
        $(id).css('right', position + 'px');           
    });

    socket.on('left', (square) => {
        var id = '#' + square;
        var position = parseInt($(id).css('right')) + shift;                
        $(id).css('right', position + 'px');           
    });

    socket.on('up', (square) => {
        var id = '#' + square;
        var position = parseInt($(id).css('top')) - shift;                
        $(id).css('top', position + 'px');           
    });

    socket.on('down', (square) => {
        var id = '#' + square;
        var position = parseInt($(id).css('top')) + shift;                
        $(id).css('top', position + 'px');           
    });

    $(document).keydown((event) => {

        var keyCode = event.keyCode;

        switch (keyCode) {
            case LEFT_KEY_CODE:
                socket.emit('left', square);                                
                break;
            case RIGHT_KEY_CODE:                                   
                socket.emit('right', square);
                break;
            case UP_KEY_CODE:                
                socket.emit('up', square);        
                break;
            case DOWN_KEY_CODE:                
                socket.emit('down', square);        
                break;
        }        
    });

});