import React, { useState, useEffect, useRef } from "react";
import { Input, InputRef } from "antd";
import { useSignup } from "../hooks/useSignup";
import { Link, Navigate } from "react-router-dom";
import Grid from "./Grid";
import "./Signup.css";

const Signup: React.FC = () => {
  const [isUsernameEntered, setIsUsernameEntered] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { signupUser } = useSignup();
  const [redirectToDashboard, setRedirectToDashboard] = useState(false);
  const [usernameClass, setUsernameClass] = useState("border-blue-400");
  const [shake, setShake] = useState(false);
  const passwordInputRef = useRef<InputRef>(null);

  useEffect(() => {
    setUsernameClass(
      username.length > 15 ? "outline-red-500" : "outline-black"
    );
    setShake(username.length > 15);
  }, [username]);

  useEffect(() => {
    if (!isUsernameEntered) {
      document.getElementById("usernameInput")?.focus();
    } else {
      passwordInputRef.current?.focus();
    }
  }, [isUsernameEntered]);

  const handleUsernameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.length >= 3) {
      setIsUsernameEntered(true);
    } else {
      alert("Username must be at least 3 characters long.");
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signupUser(username, password);
      setRedirectToDashboard(true);
    } catch (error) {
      alert(error);
    }
  };

  const handleGoBack = () => {
    setIsUsernameEntered(false);
  };

  if (redirectToDashboard) {
    return <Navigate to={"/dashboard"} />;
  }

  return (
    <div className="relative h-screen">
      <Grid />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10">
        {!isUsernameEntered ? (
          <form
            onSubmit={handleUsernameSubmit}
            className="absolute w-80 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col gap-5 justify-center items-center bg-white rounded-lg border border-black p-8 z-10"
            style={{
              border: "1px solid black",
              backgroundColor: "white",
              padding: "20px",
            }}
          >
            <p className="text-center text-2xl">Sign up</p>
            <p className="self-start">username</p>
            <input
              autoComplete="off"
              id="usernameInput"
              className={`text-xl ${usernameClass} border px-2 py-2 rounded-md ${
                shake ? "shake" : ""
              }`}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter Username"
            />
            <h1 className="flex gap-5">Have an account? <Link className="underline" to={"/"}>Login</Link></h1>
            <button
              type="submit"
              disabled={username.length > 15}
              className={`${
                username.length > 15 ? "bg-slate-300 cursor-not-allowed" : ""
              } bg-black active:bg-transparent active:border active:border-black active:text-black cursor-pointer self-center text-white px-4 py-2 rounded-lg text-xl`}
            >
              Continue
            </button>
          </form>
        ) : (
          <form
            onSubmit={handlePasswordSubmit}
            className="absolute w-80 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col gap-5 justify-center items-center bg-white rounded-lg border border-black p-8 z-10"
          >
            <p className="text-xl">Password</p>
            <Input.Password
              ref={passwordInputRef}
              onChange={handlePasswordChange}
              className="w-60"
              placeholder="Enter Password"
              value={password}
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
    </div>
  );
};

export default Signup;
