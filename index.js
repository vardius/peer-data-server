'use strict';

var io = require('socket.io')(8080),
    os = require('os');

const SocketEventType = {
    CANDIDATE: 'candidate',
    CONNECT: 'connect',
    DISCONNECT: 'disconnect',
    OFFER: 'offer',
    ANSWER: 'answer'
};

io.sockets.on('connection', function (socket) {
    var id = socket.id;

    function log() {
        socket.emit('log', ...arguments);
    }

    function onConnect() {
        socket.join(id);
    }

    function onDisconnect() {
        socket.leave(id);
    }

    socket.on('message', function (event) {
        event.caller = {
            id: id
        };

        log(event);

        if (event.callee) {
            socket.broadcast.to(event.callee.id).emit('message', event);
        } else {
            switch (event.type) {
                case SocketEventType.CONNECT:
                    onConnect(event);
                    break;
                case SocketEventType.DISCONNECT:
                    onDisconnect(event);
                    break;
            }
            socket.broadcast.emit('message', event);
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