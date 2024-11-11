import React, { useState, useEffect } from "react";

function Chat() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Connect to the WebSocket server
    const ws = new WebSocket("ws://localhost:8080");
    setSocket(ws);

    // Listen for incoming messages and update the messages list
    ws.onmessage = (event) => {
      setMessages((prevMessages) => [...prevMessages, event.data]);
    };

    // Clean up when the component unmounts
    return () => {
      ws.close();
    };
  }, []);

  const sendMessage = () => {
    if (socket && message) {
      // Send the message to the WebSocket server
      socket.send(message);
      setMessage("");
    }
  };

  return (
    <div>
      <h2>React WebSocket Chat</h2>
      <div
        style={{
          border: "1px solid #ccc",
          padding: "10px",
          height: "300px",
          overflowY: "scroll",
        }}
      >
        {messages.map((msg, index) => (
          <p key={index}>{msg}</p>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default Chat;
