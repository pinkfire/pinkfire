var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));

app.post('/threads', function(req, res){
    if (!req.body.path) {
        return res.status(400).end();
    }

    io.emit('threads', req.body);

    res.status(201).end();
});

http.listen(3000, function(){
    console.log('listening on *:3000');
});