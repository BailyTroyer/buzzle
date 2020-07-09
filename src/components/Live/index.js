// import React from 'react'
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
// import Auth from './Auth'
// import Home from './Home'
// import Login from './Login'
// const App = () => {
//   return (
//     <Router>
//       <Switch>
//         <Route exact path="/login" component={Login} />
//         <Route exact path="/" component={Auth(Home)} />
//       </Switch>
//     </Router>
//   );
// }
// export default App
import React, { useEffect, useState, createRef, useRef } from "react";
import ReactDOM from 'react-dom';
import socketIOClient from "socket.io-client";
const ENDPOINT = "https://d62d50da32cf.ngrok.io";
const configuration = {
  iceServers: [
    {
      url: "stun:global.stun.twilio.com:3478?transport=udp",
      urls: "stun:global.stun.twilio.com:3478?transport=udp",
    },
    {
      username:
        "dc2d2894d5a9023620c467b0e71cfa6a35457e6679785ed6ae9856fe5bdfa269",
      credential: "tE2DajzSJwnsSbc123",
      url: "turn:global.turn.twilio.com:3478?transport=udp",
      urls: "turn:global.turn.twilio.com:3478?transport=udp",
    },
    {
      username:
        "dc2d2894d5a9023620c467b0e71cfa6a35457e6679785ed6ae9856fe5bdfa269",
      credential: "tE2DajzSJwnsSbc123",
      url: "turn:global.turn.twilio.com:3478?transport=tcp",
      urls: "turn:global.turn.twilio.com:3478?transport=tcp",
    },
    {
      username:
        "dc2d2894d5a9023620c467b0e71cfa6a35457e6679785ed6ae9856fe5bdfa269",
      credential: "tE2DajzSJwnsSbc123",
      url: "turn:global.turn.twilio.com:443?transport=tcp",
      urls: "turn:global.turn.twilio.com:443?transport=tcp",
    },
  ],
};
function Live() {
  const { RTCPeerConnection, RTCSessionDescription } = window;
  const [video] = useState(createRef());
  const [video1] = useState(createRef());
  var socket = useRef();
  var localStream = useState(createRef());
  var socketId = useRef();
  var connections = useRef([]);
  var remoteVids = useRef([])
  var lazy = createRef()
  function gotMessageFromServer(fromId, message) {
    console.log("gotMessageFromServer", fromId);
    //Parse the incoming signal
    var signal = JSON.parse(message);
    //Make sure it's not coming from yourself
    if (fromId !== socketId.current) {
      if (signal.sdp) {
        connections.current[fromId]
          .setRemoteDescription(new RTCSessionDescription(signal.sdp))
          .then(function () {
            if (signal.sdp.type === "offer") {
              connections.current[fromId]
                .createAnswer()
                .then(function (description) {
                  connections.current[fromId]
                    .setLocalDescription(description)
                    .then(function () {
                      socket.current.emit(
                        "signal",
                        fromId,
                        JSON.stringify({
                          sdp: connections.current[fromId].localDescription,
                        })
                      );
                    })
                    .catch((e) => console.log(e));
                })
                .catch((e) => console.log(e));
            }
          })
          .catch((e) => console.log(e));
      }
      if (signal.ice) {
        connections.current[fromId]
          .addIceCandidate(new RTCIceCandidate(signal.ice))
          .catch((e) => console.log(e));
      }
    }
  }
  // const getHandshake = () => {
  //   console.log("GOT HANDSHAKE: ", enteredName)
  // }
  useEffect(() => {
    const username = prompt('Please enter your name')
    const room = prompt('Please enter your room name')
    navigator.getUserMedia = ( navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia);
    if (navigator.mediaDevices.getUserMedia) {
      navigator.getUserMedia(
        { audio: true, video: true },
        (stream) => {
          console.log("howdy debug statement");
          localStream.current = stream;
          console.log(localStream.current);
          video.current.srcObject = stream;
          socket.current = socketIOClient(ENDPOINT);
          socket.current.on("signal", gotMessageFromServer);
          socket.current.on("handshake", () => {
            socket.current.emit("handshake-response", {
              username,
              room
            })
          });
          socket.current.on("connect", function () {
            socketId.current = socket.current.id;
            socket.current.on("user-left", function (id) {
              // HANDLE THIS BEING REMOVED
              // var video = document.querySelector('[data-socket="'+ id +'"]');
              // var parentDiv = video.parentElement;
              // video.parentElement.parentElement.removeChild(parentDiv);
            });
            socket.current.on("user-joined", function (id, count, clients) {
              console.log("USER JOINED: ", clients)
              clients.forEach(function (socketListId) {
                console.log("YOL ", connections.current);
                if (connections.current[socketListId] == null) {
                  connections.current[socketListId] = new RTCPeerConnection(
                    configuration
                  );
                  //Wait for their ice candidate
                  connections.current[socketListId].onicecandidate = function (
                    event
                  ) {
                    if (event.candidate != null) {
                      console.log("SENDING ICE");
                      socket.current.emit(
                        "signal",
                        socketListId,
                        JSON.stringify({ ice: event.candidate })
                      );
                    }
                  };
                  //Wait for their video stream
                  connections.current[socketListId].onaddstream = function (event) {
                    const nodeElement = document.getElementById('vids');
                    var video = document.createElement('video');
                    video.srcObject = event.stream;
                    video.autoplay = true; 
                    video.muted = false;
                    video.playsinline = true;
                    video.width = "320"
                    video.height = "240"
                    nodeElement.appendChild(video)
                  };
                  //Add the local video stream
                  console.log("YOYO: ", connections.current[socketListId]);
                  console.log("STREE, ", localStream.current);
                  connections.current[socketListId].addStream(
                    localStream.current
                  );
                }
              });
              //Create an offer to connect with your local description
              if (count >= 2) {
                connections.current[id]
                  .createOffer()
                  .then(function (description) {
                    connections.current[id]
                      .setLocalDescription(description)
                      .then(function () {
                        // console.log(connections.current);
                        socket.current.emit(
                          "signal",
                          id,
                          JSON.stringify({
                            sdp: connections.current[id].localDescription,
                          })
                        );
                      })
                      .catch((e) => console.log(e));
                  });
              }
            });
          });
        },
        (err) => {
          alert(err.name);
        }
      );
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="Live">
      <div style={{ flexDirection: "row" }}>
        <video
          key={video}
          width="320"
          height="240"
          ref={video}
          autoPlay={true}
          muted={true}
        />
        <div id="vids" />
        {remoteVids.current !== null &&
          remoteVids.current.map((rv, i) => React.createElement("video", { key: i, height: "240", width: "320", ref: rv, autoPlay: true, muted: true }))
        }
      </div>
    </div>
  );
}
export default Live;