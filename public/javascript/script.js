const LEFT_KEY_CODE = 37;
const RIGHT_KEY_CODE = 39;
const UP_KEY_CODE = 38;
const DOWN_KEY_CODE = 40;
const SHIFT = 5;

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

    socket.on('right', (data) => {
        var id = '#' + data.square;
        var position = data.newPosition + 'px';
        //if (newPosition >= 0)
            $(id).css('right', position);
    });

    socket.on('left', (data) => {
        var id = '#' + data.square;
        var position = data.newPosition;               
        //if (parseInt($('#board').css('width')) >= newPosition + parseInt($(id).css('width')))
            $(id).css('right', position);
    });
    socket.on('up', (data) => {
        var id = '#' + data.square;
        var position = data.newPosition + 'px';
        //if (newPosition >= 0)
            $(id).css('top', position);
    });

    socket.on('down', (data) => {
        var id = '#' + data.square;
        var position = data.newPosition + 'px';   
        //if (parseInt($('#board').css('height')) >= newPosition + parseInt($(id).css('height')))
            $(id).css('top', position);
    });

    socket.emit('board', ({'width':$('#board').css('width'), 'height':$('#board').css('height')}))

    socket.on('init', (data) => {
        $('#red').css('top', data.red.top + 'px');
        $('#red').css('right', data.red.right + 'px');
        $('#green').css('top', data.green.top + 'px');
        $('#green').css('right', data.green.right + 'px');
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