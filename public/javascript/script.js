const LEFT_KEY_CODE = 37;
const RIGHT_KEY_CODE = 39;
const UP_KEY_CODE = 38;
const DOWN_KEY_CODE = 40;


$(document).ready(() => {

    $(document).keydown((event) => {

        var keyCode = event.keyCode;
        var shift = 5;
        
        switch (keyCode) {
            case LEFT_KEY_CODE:
                var rightPosition = parseInt($('#green').css('right')) + shift;                
                $('#green').css('right', rightPosition + 'px');                                
                break;
            case RIGHT_KEY_CODE:                   
                var rightPosition = parseInt($('#green').css('right')) - shift;                
                $('#green').css('right', rightPosition + 'px');             
                break;
            case UP_KEY_CODE:                
                break;
            case DOWN_KEY_CODE:                
                break;
        }

        
    });

});