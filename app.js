var express = require('express');
var app = express();
var serv = require('http').Server(app);

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/cliente/index.html');
});
app.use('/cliente', express.static(__dirname + '/cliente'));

serv.listen(2000);
console.log("server started");

var socket_list = [];

var io = require('socket.io')(serv, {});
io.sockets.on('connection', function(socket){
     socket.id = Math.random();
     socket.x = 0;
     socket.y = 0;
     socket.number = "" + Math.floor(10 * Math.random());
     socket_list[socket.id] = socket;

    socket.on('disconnect', function(){
        delete socket_list[socket.id];
    });
});

setInterval(function(){
    var pack = [];
    for(var i in socket_list)
    {
        var socket = socket_list[i];
        socket.x++;
        socket.y++;
        pack.push({
            x:socket.x,
            y:socket.y,
            number:socket.number
        });
    }

    for(var i in socket_list){
        var socket = socket_list[i];
        socket.emit('newPositions', pack);
    }

    
}, 1000/25);