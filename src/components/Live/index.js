import React, { useEffect, useState, createRef, useRef } from "react";
import ReactDOM from 'react-dom';
import socketIOClient from "socket.io-client";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone, faMicrophoneSlash } from '@fortawesome/free-solid-svg-icons';

const ENDPOINT = "https://www.buzzle.live";
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
const Live = (routerProps) => {
  const { RTCPeerConnection, RTCSessionDescription } = window;
  const [video] = useState(createRef());
  const [video1] = useState(createRef());
  var socket = useRef();
  var localStream = useState(createRef());
  var socketId = useRef();
  var connections = useRef([]);
  var remoteVids = useRef([])

  const [muted, setMuted] = useState(true)


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
    //const username = prompt('Please enter your name')
    const username = Array(8).fill('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789').map(function(x) { return x[Math.floor(Math.random() * x.length)] }).join('')
    const room = routerProps.match.params.liveId
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
            socket.current.on("user-left", function (id) {
                // HANDLE THIS BEING REMOVED
                console.log("ID LEFT: ", id)
                // var video = document.querySelector('[data-socket="'+ id +'"]');
                var video = document.getElementById(id)
                console.log("GOT THE VID: ", video)
                if (video !== null) {
                  var parentDiv = video.parentElement;
                  console.log("PARENT DIV: ", parentDiv)
                  parentDiv.removeChild(video)
                  // video.parentElement.parentElement.removeChild(parentDiv);
                }
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
                    video.muted = true;
                    video.playsinline = true;
                    video.width = "480"
                    video.height = "360"
                    video.id = socketListId
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
    <div className="flex flex-col bg-darkish w-screen h-screen justify-between">
      <div className="flex flex-col">
        <div className="flex flex-row flex-wrap">
          <div id="vids" className="flex flex-row flex-wrap">
            <video
              key={video}
              width="480"
              height="360"
              ref={video}
              autoPlay={true}
              muted={muted}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-row my-12 mx-12">
        <div className={`flex flex-row bg-${muted ? "black" : "white"} justify-center items-center align-center rounded-full w-16 h-16`}>
          <FontAwesomeIcon icon={muted ? faMicrophoneSlash : faMicrophone} color={muted ? "#FFF" : "000"} size="2x" onClick={() => setMuted(!muted)} />
        </div>
      </div>
    </div>
  );
}
export default Live;