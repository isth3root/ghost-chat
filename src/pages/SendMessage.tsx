import TextArea from "antd/es/input/TextArea";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const SendMessage: React.FC = () => {
  const { username } = useParams<{ username: string }>();
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
      <h1>Messaging to {username}</h1>
      <div>
        <TextArea value={message} onChange={(e) => setMessage(e.target.value)} showCount rows={7} placeholder="message" maxLength={100} />
      </div>
      <button onClick={handleSubmit} className="bg-amber-500 hover:bg-amber-400 px-4 py-2 rounded-lg">
        Send
      </button>
    </div>
  );
};

export default SendMessage;
