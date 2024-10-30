import axios from "axios";

const API_URL = "https://ghost-chat.liara.run/api";

export const useLogin = () => {

  const loginUser = async (username: string, password: string) => {
    try {
      const response = await axios.post(`${API_URL}/users/login`, {
        username,
        password,
      });
      localStorage.setItem("user", JSON.stringify(response.data.user));
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  return { loginUser };
};
