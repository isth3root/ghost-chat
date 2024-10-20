import TextArea from "antd/es/input/TextArea";
import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const SendMessage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    try {
      await axios.post(
        `https://ghost-chat.liara.run/api/messages/send-message`,
        {
          username,
          message,
        }
      );
      alert("Message sent successfully!");
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message.");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-[100vh] gap-10">
      <Link className="absolute left-1/2 top-10 underline -translate-x-1/2" to="/dashboard">Back to Dashboard</Link>
      <div className="flex gap-3 flex-wrap  items-center">
        <h1>Messaging to </h1>
        <input 
        className="border border-black rounded-md p-2" 
        placeholder="enter username" 
        onChange={(e)=> setUsername(e.target.value)}
        />
      </div>
      <div>
        <TextArea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          showCount
          rows={7}
          cols={37}
          placeholder="message"
          maxLength={100}
        />
      </div>
      <button
        onClick={handleSubmit}
        className="border border-black px-4 py-2 rounded-lg"
      >
        Send
      </button>
    </div>
  );
};

export default SendMessage;
