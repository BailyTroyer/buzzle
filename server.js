// Setup basic express server
var express = require('express')
var app     = express()
var path    = require('path')
var server  = require('http').createServer(app)
var io      = require('socket.io')(server)
var port    = process.env.PORT || 4000

server.listen(port, () => {
  console.log('Server listening at port %d', port)
})

// Routing
app.use(express.static(path.join(__dirname, 'build')))

var organizations = []
const org = 'acvauctions' // temporarily hardcoded
var activeSockets = [];

function getOrg() {
  return org
} 

io.on('connection', function(socket) {
  console.log('A user connected');
  const existingSocket = activeSockets.find(
    existingSocket => existingSocket === socket.id
  );
  if (!existingSocket) {
    activeSockets.push(socket.id);
    socket.emit("update-user-list", {
     users: activeSockets.filter(
         existingSocket => existingSocket !== socket.id
       )
     });
    socket.broadcast.emit("update-user-list", {
       users: [socket.id]
    });
  }
  socket.on("disconnect", () => {
    activeSockets = activeSockets.filter(
      existingSocket => existingSocket !== socket.id
    );
    socket.broadcast.emit("remove-user", {
      socketId: socket.id
    });
  });
  socket.on("call-user", data => {
    socket.to(data.to).emit("call-made", {
      offer: data.offer,
      socket: socket.id
    });
  });
  socket.on("make-answer", data => {
    socket.to(data.to).emit("answer-made", {
      socket: socket.id,
      answer: data.answer
    });
  });
});