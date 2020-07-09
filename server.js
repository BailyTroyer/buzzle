
var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var path    = require('path')
var cors = require('cors');
var io = require('socket.io')(http);

// Routing
app.use(express.static(path.join(__dirname, 'build')))

app.get('/l/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.use(cors());
var userSession = []
var rooms = []
app.get('/', function(req, res) {
  res.send('Hello World!');
});
app.get('/rooms', function(req, res) {
  res.send(rooms);
});
app.get('/session', function(req, res) {
  res.send(userSession);
});
//Whenever someone connects this gets executed
io.on('connection', function(socket) {
	io.sockets.emit("handshake");
	socket.on('handshake-response', (data) => {
		console.log("USER SESH SOME: ", userSession.some(e => e.socketId === socket.id))
		console.log("ROOM: ", data.room)
		if (!userSession.some(e => e.socketId === socket.id)) {
			// if user 1st time add to list
			userSession.push({
				name: data.username,
				socketId: socket.id
			})
		}
		// add to room
		socket.join(data.room)
		// add to room store
		if (!rooms.some(e => e.room === data.room)) {
			// room DNE...create it
			rooms.push({
				room: data.room,
				host: socket.id,
				listeners: [],
				participants: [socket.id]
			})
		} else {
			// already exists, append to room participants
			let roomInstance = rooms.find(e => e.room === data.room)
			if (!roomInstance.participants.includes(socket.id)) {
				roomInstance.participants.push(socket.id)
			}
			if (roomInstance.host === 'finding new host') {
				roomInstance.host = socket.id
			}
			// emit to other users
			io.to(data.room).emit("user-joined", socket.id, roomInstance.participants.length, roomInstance.participants);
		}
	})
	socket.on('signal', (toId, message) => {
		io.to(toId).emit('signal', socket.id, message);
	});
	socket.on("message", function(data){
		io.sockets.emit("broadcast-message", socket.id, data);
	})
	socket.on('disconnect', function() {
		io.sockets.emit("user-left", socket.id);
		console.log("LOST THIS USER: ", socket.id)
		userSession = userSession.filter(user => user.socketId !== socket.id)
		rooms = rooms.map(room => {
			// check if user was in participants || listeners & remove
			if (room.listeners.some(e => e === socket.id)) { room.listeners = room.listeners.filter(userId => userId !== socket.id) }
			if (room.participants.some(e => e === socket.id)) { room.participants = room.participants.filter(userId => userId !== socket.id) }
			if (socket.id === room.host) {
				room.host = 'finding new host'
			}
			return room
		})
	})
});
http.listen(4000, function() {
   console.log('listening on *:4000');
});