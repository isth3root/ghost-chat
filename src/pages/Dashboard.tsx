import React, { useEffect, useState } from "react";
import { User } from "../types/User";
import { Message } from "../types/Message";
import { useNavigate } from "react-router-dom";
import useGetMessages from "../hooks/useGetMessages";

const Dashboard: React.FC = () => {
  const BASE_URL = "https://isth3root.github.io/ghost-chat";
  const [localUser, setLocalUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("copied to clipboard!")
  } 

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setLocalUser(JSON.parse(user));
    }
  }, []);

  useGetMessages(localUser ? localUser.username : "");

  const handleLogOut = (e: React.MouseEvent<HTMLHeadingElement>) => {
    e.preventDefault();
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div>
      {localUser ? (
        <div>
          <div className="flex justify-around mt-5">
            <div className="text-center flex text-2xl gap-2 items-center">
              Welcome, {localUser.username}
              <h1 className="text-base cursor-pointer" onClick={handleLogOut}>
                (log out)
              </h1>
            </div>
            <div className="flex gap-2">
              My Link:{" "}
              <p
                onClick={() =>
                  handleCopy(`${BASE_URL}/sendMessage/${localUser.username}`)
                }
                className="text-violet-600 underline cursor-pointer"
              >{`${BASE_URL}/sendMessage/${localUser.username}`}</p>
            </div>
          </div>
          <ul className="flex flex-col items-center mt-20 gap-10">
            {localUser.messages.map((message: Message) => (
              <li
                className="text-center border rounded-md p-5 border-black w-64 py-5"
                key={`${message._id}-${message}`}
              >
                {message.text}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-center">Please log in to see your messages.</p>
      )}
    </div>
  );
};

export default Dashboard;
