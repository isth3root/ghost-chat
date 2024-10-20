import React, { useContext, useEffect, useState } from "react";
import UserContext from "../contexts/UserContext";
import { User } from "../types/User";
import { Link, useNavigate } from "react-router-dom";
import useFetchUser from "../hooks/useFetchUser";

const Dashboard: React.FC = () => {
  const { user } = useContext(UserContext)
  const [localUser, setLocalUser] = useState<User | null>(null);
  const navigate = useNavigate();
  
  useFetchUser(user?.username || "");
  
  useEffect(() => {
    if (user) {
      setLocalUser(user);
    }
  }, [user]);

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
            <Link className="border px-2 py-1 border-black" to={"/sendMessage"}>
              Send message
            </Link>
          </div>
          <ul className="flex flex-col items-center mt-20 gap-10">
            {localUser.messages.map(
              (message: { _id: string; text: string }) => (
                <li
                  className="text-center border rounded-md p-5 border-black w-64 py-5"
                  key={message._id}
                >
                  {message.text}
                </li>
              )
            )}
          </ul>
        </div>
      ) : (
        <p>Please log in to see your messages.</p>
      )}
    </div>
  );
};

export default Dashboard;
