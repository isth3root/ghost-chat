import axios from "axios";
import { useUser } from "../contexts/UserContext";

const API_URL = "https://ghost-chat.liara.run/api";

export const useUserActions = () => {
  const { setUser } = useUser();

  const login = async (username: string, password: string) => {
    const response = await axios.post(`${API_URL}/login`, {
      username,
      password,
    });
    setUser(response.data.user);
  };

  const sendMessage = async (username: string, message: string) => {
    await axios.post(`${API_URL}/messages/send-message`, { username, message });
  };

  return { login, sendMessage };
};
