var socket = io();
var id = window.location.href.split('=')[1]; 
var pictionary = function(_id) {
    var canvas, context, drawing;

    var draw = function(position) {
        context.beginPath();
        context.arc(position.x, position.y,
                         6, 0, 2 * Math.PI);
        context.fill();
    };
    

    canvas = $('canvas');
    context = canvas[0].getContext('2d');
    canvas[0].width = canvas[0].offsetWidth;
    canvas[0].height = canvas[0].offsetHeight;
 canvas.on('mousedown',function(event){drawing = true
            canvas.on('mouseup',function(){drawing = false;});
                canvas.on('mousemove', function(event) {
                    if(drawing){
        var offset = canvas.offset();
        var position = {x: event.pageX - offset.left,
                        y: event.pageY - offset.top};
        draw(position);
        socket.emit('draw',position,_id);
                    }
                });
            });
};

var drawPoint = function() {
    var canvas, context;
    //console.log(point);
    var draw = function(position,eventId) {
        console.log(id+ " "+eventId);
        if(id ===eventId){
            context.beginPath();
            context.arc(position.x, position.y,
                             6, 0, 2 * Math.PI);
            context.fill();
        }
    };

    canvas = $('canvas');
    context = canvas[0].getContext('2d');
    canvas[0].width = canvas[0].offsetWidth;
    canvas[0].height = canvas[0].offsetHeight;
 
       
            socket.on('draw',draw);
};

var drawInitial = function(positions){
    var canvas, context;
     var draw = function(position) {
        context.beginPath();
        context.arc(position.x, position.y,
                         6, 0, 2 * Math.PI);
        context.fill();
    };

    canvas = $('canvas');
    context = canvas[0].getContext('2d');
    canvas[0].width = canvas[0].offsetWidth;
    canvas[0].height = canvas[0].offsetHeight;
    positions.forEach(draw);
    //draw(pos);
}


$(document).ready(function() {
    
    pictionary(id);
    drawPoint();
    $.get( "/drawings/"+id, function( data ) {
         drawInitial(data.points);
    });
});