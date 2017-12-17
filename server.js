var http = require('http');
var fs = require('fs');

// Send index.html to all requests
var app = http.createServer(function (request, response) {
   response.writeHead('200', {'Content-Type': 'text/html'});
   fs.readFile('./index.html', function (err, data) {
       response.write(data);
       response.end();
   });
});

// Socket.io server listens to our app
var io = require('socket.io').listen(app);

// Send current time to all connected clients
function sendTime() {
    io.sockets.emit('time', { time: new Date().toJSON() });
}

function sendMessage() {
    io.sockets.emit('message', { msg: "Welcome to my socket.io app"});
}

// on socket connection call the function
io.on('connection', function(socket){
    console.log("a user is connected");
    setInterval(sendTime, 20000);
    setInterval(sendMessage, 20000);
});

// Listening to the port 8000
app.listen(8000, function () {
    console.log("Listening on port 8000");
});