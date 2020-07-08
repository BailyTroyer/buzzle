import React, { useEffect, useState, createRef, useRef } from 'react';
import socketIOClient from "socket.io-client";

//const ENDPOINT = "buzzle.live";
const ENDPOINT = "f2324a8928dd.ngrok.io";

function App() {
  const { RTCPeerConnection, RTCSessionDescription } = window;
  const [video]=useState(createRef());
  const [remoteVideo]=useState(createRef());
  const [userList, setUsers] = useState([]);
  var socket = useRef();
  var peerConnection = useRef();
  var isAlreadyCalling = false;
  useEffect(() => {
    navigator.getUserMedia({ audio: true, video: true},
      (stream) => {
        console.log("stream",stream)
        video.current.srcObject = stream;
        stream.getTracks().forEach(track => {
          console.log("forEach", track)
          peerConnection.current.addTrack(track, stream)
        });
      },
      (err) => {
        alert(err.name)
      },
    );
    const myIceServers = [
      {
        "url": "stun:global.stun.twilio.com:3478?transport=udp",
        "urls": "stun:global.stun.twilio.com:3478?transport=udp"
      },
      {
        "username": "dc2d2894d5a9023620c467b0e71cfa6a35457e6679785ed6ae9856fe5bdfa269",
        "credential": "tE2DajzSJwnsSbc123",
        "url": "turn:global.turn.twilio.com:3478?transport=udp",
        "urls": "turn:global.turn.twilio.com:3478?transport=udp"
      },
      {
        "username": "dc2d2894d5a9023620c467b0e71cfa6a35457e6679785ed6ae9856fe5bdfa269",
        "credential": "tE2DajzSJwnsSbc123",
        "url": "turn:global.turn.twilio.com:3478?transport=tcp",
        "urls": "turn:global.turn.twilio.com:3478?transport=tcp"
      },
      {
        "username": "dc2d2894d5a9023620c467b0e71cfa6a35457e6679785ed6ae9856fe5bdfa269",
        "credential": "tE2DajzSJwnsSbc123",
        "url": "turn:global.turn.twilio.com:443?transport=tcp",
        "urls": "turn:global.turn.twilio.com:443?transport=tcp"
      }
    ];
    var configuration = { iceServers: myIceServers };
    peerConnection.current = new RTCPeerConnection(configuration);
    peerConnection.current.ontrack = function({ streams: [stream] }) {
      // const remoteVideo = document.getElementById("remote-video");
      console.log('REMOTE VIDEO: ', stream)
      remoteVideo.current.srcObject = stream
     };
    socket.current = socketIOClient(ENDPOINT);
    socket.current.on("update-user-list", ({ users }) => {
      console.log('update user list: ', users)
      setUsers(users)
    });
    socket.current.on("remove-user", ({ socketId }) => {
      console.log('remove user: ', socketId)
      // TODO: this should probably remove users from the UserList
    });
    socket.current.on("call-made", async data => {
      console.log('CALL MADE: ', data.offer)
      await peerConnection.current.setRemoteDescription(
        new RTCSessionDescription(data.offer)
      );
      const answer = await peerConnection.current.createAnswer();
      await peerConnection.current.setLocalDescription(new RTCSessionDescription(answer));
      console.log("MAKE ANSWER: ", answer)
      socket.current.emit("make-answer", {
        answer,
        to: data.socket
      });
    });
    socket.current.on("answer-made", async data => {
      console.log('ANSWER MADE: ', data.answer)
      await peerConnection.current.setRemoteDescription(
        new RTCSessionDescription(data.answer)
      );
      console.log('SOCKET DATA', data.socket);
      if (!isAlreadyCalling) {
        callUser(data.socket);
        isAlreadyCalling = true;
      }
     });
  }, [])
  // TODO: split into two functions, the wrapper, then then for each remote connection
  async function callUser(socketId) {
    const offer = await peerConnection.current.createOffer();
    await peerConnection.current.setLocalDescription(new RTCSessionDescription(offer));
    socket.current.emit("call-user", {
      offer,
      to: socketId
    });
  }
  return (
    <div className="App">
      <div>
        {userList.map(user => <button onClick={() => callUser(user)} key={user}>{`Call ${user}`}</button>)}
      </div>
      <div style={{
        display: 'flex',
        flexDirection: 'row'
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column'
        }}>
          <video width="320" height="240" ref={video} autoPlay={true} muted={true} />
          <p>You</p>
        </div>
        <div style={{
          display: 'flex',
          flexDirection: 'column'
        }}>
          <video width="320" height="240" ref={remoteVideo} autoPlay={true} />
          <p>Them</p>
        </div>
        {/*  TODO: div for each non listening socketConnection
                   currently using video because it's less annoying than audio
                   and more obvious
        userList.map(user => 
        <div style={{
          display: 'flex',
          flexDirection: 'column'
        }}>
          <video width="320" height="240" ref={remoteVideo} autoPlay={true} />
          <p>{`User: ${user}`}</p>
        </div>
        )*/}
      </div>
    </div>
  );
}
export default App;
