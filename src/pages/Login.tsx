import { Input } from "antd";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";
import Grid from "./Grid";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { loginUser } = useLogin();
  const [redirectToDashboard, setRedirectToDashboard] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await loginUser(username, password);
    setRedirectToDashboard(true);
  };

  if (redirectToDashboard) {
    return <Navigate to={"/dashboard"} />;
  }

  return (
    <div className="relative h-screen">
      <Grid />
      <form
        onSubmit={handleSubmit}
        className="absolute w-80 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center bg-white rounded-lg border border-black p-8 z-10"
      >
        <h1 className="mb-7 text-2xl">Login</h1>
        <h1 className="text-xl mb-2 self-start">Username</h1>
        <div className="w-full max-w-xs mb-4">
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full"
            placeholder="Enter your username"
          />
        </div>
        <h1 className="text-xl mb-2 self-start">Password</h1>
        <div className="w-full max-w-xs mb-4">
          <Input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            className="w-full"
            placeholder="Enter your password"
          />
        </div>
        <h1>
          Not Registered?{" "}
          <Link className="ml-3 underline" to={"/signup"}>
            Sign Up
          </Link>
        </h1>
        <button
          type="submit"
          className="bg-black px-4 py-2 w-full active:bg-transparent active:text-black active:border active:border-black rounded-md text-white cursor-pointer mt-5"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Login;
