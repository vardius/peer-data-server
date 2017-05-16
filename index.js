'use strict';

const socketIO = require('socket.io');
const path = require('path');
const os = require('os');

const PORT = process.env.PORT || 3000;

const io = socketIO(PORT);

const SocketEventType = {
    CONNECT: 'CONNECT',
    DISCONNECT: 'DISCONNECT',
    CANDIDATE: 'CANDIDATE',
    OFFER: 'OFFER',
    ANSWER: 'ANSWER',
};

io.on('connection', function (socket) {
    function log() {
        socket.emit('log', ...arguments);
    }

    function onConnect(id) {
        console.log('Client connected to room: ' + id);
        socket.join(id);
    }

    function onDisconnect(id) {
        console.log('Client disconnected from room: ' + id);
        socket.leave(id);
    }

    socket.on('message', function (event) {
        event.caller = {
            id: socket.id
        };

        log('SERVER_LOG', event);

        switch (event.type) {
          case SocketEventType.CONNECT:
            onConnect(event.room.id);
            socket.broadcast.to(event.room.id).emit('message', event);
            break;
          case SocketEventType.DISCONNECT:
            onDisconnect(event.room.id);
            socket.broadcast.to(event.room.id).emit('message', event);
            break;
          case SocketEventType.OFFER:
          case SocketEventType.ANSWER:
          case SocketEventType.CANDIDATE:
            socket.broadcast.to(event.callee.id).emit('message', event);
            break;
          default:
            socket.broadcast.to(event.room.id).emit('message', event);
        }
    });

    socket.on('ipaddr', function () {
        var ifaces = os.networkInterfaces();
        for (var dev in ifaces) {
            ifaces[dev].forEach(function (details) {
                if (details.family === 'IPv4' && details.address !== '127.0.0.1') {
                    socket.emit('ipaddr', details.address);
                }
            });
        }
    });
});
