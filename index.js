'use strict';

var express = require('express'),
    os = require('os');

const SocketEventType = {
    CONNECT: 'CONNECT',
    DISCONNECT: 'DISCONNECT',
    CANDIDATE: 'CANDIDATE',
    OFFER: 'OFFER',
    ANSWER: 'ANSWER',
};

const server = express()
    .use((req, res) => res.sendFile(INDEX))
    .listen(PORT, () => console.log(`Listening on ${ PORT }`));

const io = require('socket.io')(server);

io.on('connection', function (socket) {
    function log() {
        socket.emit('log', ...arguments);
    }

    function onConnect(id) {
        socket.join(id);
    }

    function onDisconnect(id) {
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
                break;
            case SocketEventType.DISCONNECT:
                onDisconnect(event.room.id);
                break;
        }

        socket.broadcast.to(event.room.id).emit('message', event);
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