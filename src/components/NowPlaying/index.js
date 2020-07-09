import React, { useState, useEffect, useRef, createRef } from 'react'
import '../../tailwind.generated.scss'

import { ReactMic } from 'react-mic'
import { useSelector } from 'react-redux';
import { IceConfiguration } from '../../utils'

import { useDispatch } from 'react-redux'
import { setNowPlaying } from '../../actions/nowPlaying'

import socketIOClient from "socket.io-client";
const ENDPOINT = "https://www.buzzle.live";

const NowPlaying = () => {

  const { nowPlaying, auth } = useSelector((state) => state);

  const [recording, setRecording] = useState(false)
  const dispatch = useDispatch();

  const { RTCPeerConnection, RTCSessionDescription } = window;

  const [video] = useState(createRef());
  const [video1] = useState(createRef());

  var socket = useRef();

  var localStream = useState(createRef());

  var socketId = useRef();
  var connections = useRef([]);
  var remoteVids = useRef([])
  var lazy = createRef()

  useEffect(() => {

    setRecording(nowPlaying.active)

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

    if (nowPlaying.active) {
      console.log("NOW PLAYING ACTIVE")
    
      navigator.getUserMedia(
      // navigator.mediaDevices.getUserMedia(
        { audio: true, video: true },
        (stream) => {
          console.log("howdy debug statement");
          localStream.current = stream;
          console.log(localStream.current);
          video.current.srcObject = stream;
  
          socket.current = socketIOClient(ENDPOINT);
  
          socket.current.on("signal", gotMessageFromServer);
          socket.current.on("handshake", () => {
            console.log("HANDSHAKE RESPONSE: ", {
              username: auth.name,
              room: nowPlaying.description
            })
            socket.current.emit("handshake-response", {
              username: auth.name,
              room: nowPlaying.description
            })
          });
        
          socket.current.on("connect", function () {
            socketId.current = socket.current.id;
  
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
              console.log("USER JOINED CHANNEL")
              clients.forEach(function (socketListId) {
                console.log("YOL ", connections.current);
                if (connections.current[socketListId] == null) {
                  connections.current[socketListId] = new RTCPeerConnection(IceConfiguration);
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
                    console.log('vid: ',socketListId)
                    const nodeElement = document.getElementById('vids');
                    var video = document.createElement('video');
                    video.srcObject = event.stream;
                    video.autoplay = true; 
                    video.muted = false;
                    video.playsinline = true;
                    video.width = "100"
                    video.height = "100"
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
  
    } else {
      var parent = document.getElementById("vids")
      if (parent.children.length > 1) {
        for (const child of parent.children) {
          if (child.id !== "" ) {
            parent.removeChild(child)
          }
        }
        
      }
    }

    
    return () => {
      setRecording(false)
      // dispatch(setNowPlaying(
      //   'Waiting',
      //   '...',
      //   false,
      //   false
      // ))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nowPlaying.active, nowPlaying.listen])
 

  return (
    <div className="flex flex-row w-full rounded-lg bg-darkCard h-48 text-white p-6 justify-between mr-8">
      <div className="flex flex-col justify-center align-bottom">      
        <h1 className="font-bold text-2xl w-64">{nowPlaying.title}</h1>
        <h4 className="font-semibold text-lg">{nowPlaying.description}</h4>
      </div>
      <ReactMic
        record={recording}
        className="mx-8 w-full"
        strokeColor="#FFF"
        backgroundColor="#282932"
      />
      <div id="vids">
        <video
          key={video}
          width="100"
          height="100"
          ref={video}
          autoPlay={!nowPlaying.listen}
          muted={true}
        />
      </div>
    </div>
  )
}

export default NowPlaying