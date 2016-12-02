var express = require('express');
var app = express();
var serv = require('http').Server(app);

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/cliente/index.html');
});
app.use('/cliente', express.static(__dirname + '/cliente'));

serv.listen(2000);
console.log("server started");

var io = require('socket.io')(serv, {});
io.sockets.on('connection', function(socket){
     console.log('socket connection');

     socket.on('happy', function(data){
         console.log('happy ' + data.reason);
     });

     socket.emit('serverMsg', {
         msg:'hello'
     });
});