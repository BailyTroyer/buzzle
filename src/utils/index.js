export const IceConfiguration = {
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
}