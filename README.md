# PeerDataServer
PeerDataServer is messaging service on *Node* using [socket.io](http://socket.io/). This is **ready to use** example signaling server for [PeerData](https://github.com/Vardius/peer-data) library.

The sender and receiver *RTCPeerConnections* run in web pages on different devices, and we need a way for them to communicate metadata.
For this, we use a signaling server: a server that can pass messages between *WebRTC* clients (peers).

In order to set up and maintain a *WebRTC* call, *WebRTC* clients (peers) need to exchange metadata:
- Candidate (network) information.
- Offer and answer messages providing information about media.

In other words, an exchange of metadata is required before peer-to-peer streaming of audio, video, or data can take place. This process is called signaling.
