import "./App.css";
import io from "socket.io-client";
import React, { useEffect, useState } from "react";

const socket = io.connect("http://localhost:3001");

function App() {
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");
  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
    }
  };
  console.log(React);

  const sendMessage = () => {
    socket.emit("send_message", { message, room });
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageReceived(data.message);
    });
  }, [socket]);

  return (
    <div className="App">
      <h1>React WebSocket Chat</h1>

      <input
        placeholder="Chat Room Number..."
        onChange={(event) => {
          setRoom(event.target.value);
        }}
      />
      <button onClick={joinRoom}> Join Chat Room</button>
      <input
        placeholder="Message..."
        onChange={(event) => {
          setMessage(event.target.value);
        }}
      />
      <button onClick={sendMessage}> Send Message</button>
      <h2> Message:</h2>
      <div className="messageSpace">{messageReceived}</div>
    </div>
  );
}

export default App;
