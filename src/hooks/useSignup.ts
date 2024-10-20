import { useContext } from "react";
import UserContext from "../contexts/UserContext";
import axios from "axios";

const API_URL = "https://ghost-chat.liara.run/api";

export const useSignup = () => {
  const { setUser } = useContext(UserContext);

  const signupUser = async (username: string, password: string) => {
    try {
      const response = await axios.post(`${API_URL}/users`, {
        username,
        password,
      });
      setUser(response.data.user);
      localStorage.setItem("user", JSON.stringify(response.data));
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return { signupUser };
};
