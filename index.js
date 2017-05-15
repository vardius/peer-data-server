'use strict';

const express = require('express');
const socketIO = require('socket.io');
const path = require('path');
const os = require('os');

const PORT = process.env.PORT || 3000;
const INDEX = path.join(__dirname, 'index.html');

const server = express()
    .get("/", function (req, res) {
        res.sendfile('index.html')
    })
    .get(/^(.+)$/, function (req, res) {
        console.log('static file request : ' + req.params);
        res.sendfile(__dirname + req.params[0]);
    })
    .listen(PORT, () => console.log(`Listening on ${ PORT }`));

const io = socketIO(server);

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

setInterval(() => io.emit('time', new Date().toTimeString()), 1000);