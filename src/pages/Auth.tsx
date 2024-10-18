import React, { useState, useRef, useEffect } from "react";
import { Input } from "antd";
import { useLogin } from "../hooks/useLogin";
import { Navigate } from "react-router-dom";


const Auth: React.FC = () => {
  const [isUsernameEntered, setIsUsernameEntered] = useState(false);
  const [username, setUsername] = useState(Array(10).fill(""));
  const [passwod, setPassword] = useState("");
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const {loginUser} = useLogin()
  const [redirectToDashboard, setRedirectToDashboard] = useState(false)

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const updatedUsername = [...username];
    updatedUsername[index] = e.target.value;
    setUsername(updatedUsername);

    if (e.target.value && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !e.currentTarget.value && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleUsernameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const usernameLength = username.filter((char) => char).length;
    if (usernameLength >= 3) {
      setIsUsernameEntered(true);
    } else {
      alert("Username must be at least 3 characters long.");
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const usernameString = username.join('')
    try {
      await loginUser(usernameString, passwod)
      setRedirectToDashboard(true)
    } catch (error) {
      alert(error)
    }
  };

  const handleGoBack = () => {
    setIsUsernameEntered(false);
  };
  if (redirectToDashboard) {
    return <Navigate to={"/dashboard"} />
  }

  return (
    <div className="flex items-center justify-center h-[100vh]">
      {!isUsernameEntered ? (
        <form onSubmit={handleUsernameSubmit} className="flex flex-col gap-5">
          <div className="flex gap-3">
            {Array(10)
              .fill(0)
              .map((_, i) => (
                <input
                  key={i}
                  ref={(el) => (inputRefs.current[i] = el!)}
                  className="outline-none text-2xl w-6 border-b border-black text-center"
                  maxLength={1}
                  type="text"
                  value={username[i]}
                  onChange={(e) => handleChange(e, i)}
                  onKeyDown={(e) => handleKeyDown(e, i)}
                />
              ))}
          </div>
          <button
            type="submit"
            className="bg-blue-500 cursor-pointer self-center text-white px-4 py-2 rounded-lg text-xl"
          >
            Continue
          </button>
        </form>
      ) : (
        <form
          onSubmit={handlePasswordSubmit}
          className="flex flex-col gap-3 items-center"
        >
          <Input.Password
            onChange={(e) => setPassword(e.target.value)}
            className="w-60"
            maxLength={20}
            placeholder="Enter Password"
            value={passwod}
          />
          <div className="flex gap-3">
            <button
              onClick={handleGoBack}
              className="bg-gray-500 cursor-pointer text-white w-20 px-4 py-2 rounded-lg"
            >
              Back
            </button>
            <button className="bg-green-500 cursor-pointer text-white px-4 py-2 rounded-lg">
              Submit
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Auth;
