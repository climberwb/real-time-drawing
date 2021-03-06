require('./db/connect');
var http = require('http');
var express = require('express');
var socket_io = require('socket.io');

var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use(express.static('public'));
var drawingRoutes = require('./routes/drawings');
var drawingServices = require('./services/drawings')

var server = http.Server(app);
var io = socket_io(server);



app.use(express.static('public'));

app.use('/', drawingRoutes);
app.use('*', function(req, res) {
    res.status(404).json({ message: 'Not Found' });
});



//app.use('*', );

io.on('connection', function (socket) {
    console.log('Client connected');

    socket.on('draw', function(point,id) {
        console.log('Received data point:', point,id);
        drawingServices.update(id,point,function(){
             console.log('inside callback server'+id);
             socket.broadcast.emit('draw',point,id);
        },function(err){
            console.log(err);
            return err;
        });
       
    });
});

server.listen(8080);