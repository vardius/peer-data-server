# PeerDataServer
[![Build Status](https://travis-ci.org/vardius/peer-data-server.svg?branch=master)](https://travis-ci.org/vardius/peer-data-server)
[![npm version](https://img.shields.io/npm/v/peer-data-server.svg)](https://www.npmjs.com/package/peer-data-server)
[![license](https://img.shields.io/github/license/vardius/peer-data-server.svg)](LICENSE)
[![Beerpay](https://beerpay.io/vardius/peer-data-server/badge.svg?style=beer-square)](https://beerpay.io/vardius/peer-data-server)
[![Beerpay](https://beerpay.io/vardius/peer-data-server/make-wish.svg?style=flat-square)](https://beerpay.io/vardius/peer-data-server?focus=wish)

PeerDataServer is messaging service on *Node* using [socket.io](http://socket.io/). This is **ready to use** example signaling server for [PeerData](https://github.com/Vardius/peer-data) library.

The sender and receiver *RTCPeerConnections* run in web pages on different devices, and we need a way for them to communicate metadata.
For this, we use a signaling server: a server that can pass messages between *WebRTC* clients (peers).

In order to set up and maintain a *WebRTC* call, *WebRTC* clients (peers) need to exchange metadata:
- Candidate (network) information.
- Offer and answer messages providing information about media.

In other words, an exchange of metadata is required before peer-to-peer streaming of audio, video, or data can take place. This process is called signaling.

## Installation
```bash
$ npm install peer-data-server
```

## [Documentation](https://github.com/vardius/peer-data-server/wiki)

1. [Chat Example](https://github.com/vardius/webrtc-chat)

ABOUT
==================================================
Contributors:

* [Rafał Lorenz](http://rafallorenz.com)

Want to contribute ? Feel free to send pull requests!

Have problems, bugs, feature ideas?
We are using the github [issue tracker](https://github.com/vardius/peer-data-server/issues) to manage them.

## License

The code is available under the [MIT license](LICENSE).