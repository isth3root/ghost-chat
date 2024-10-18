import React, { useEffect, useState } from "react";
import { useUser } from "../contexts/UserContext";
import {User} from '../types/User'
const Dashboard: React.FC = () => {
  const { setUser } = useUser();
  const [localUser, setLocalUser] = useState<User | null>(null)
  
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser).user;
      console.log(parsedUser);
      if (parsedUser && Array.isArray(parsedUser.messages)) {
        setLocalUser(parsedUser);
        setUser(parsedUser);
      } else {
        console.error("Stored user data is invalid:", parsedUser);
      }
    }
  }, [setUser]);

  return (
    <div>
      {localUser ? (
        <div>
          <h2 className="text-center">Welcome, {localUser.username}</h2>
          <ul className="flex flex-col items-center mt-20 gap-10">
            {localUser.messages.map((message: string, index: number) => (
              <li className="text-center border rounded-full border-black w-60 py-5" key={index}>{message}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Please log in to see your messages.</p>
      )}
    </div>
  );
};

export default Dashboard;
