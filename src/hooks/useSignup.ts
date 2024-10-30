import axios from "axios";

const API_URL = "https://ghost-chat.liara.run/api";

export const useSignup = () => {

  const signupUser = async (username: string, password: string) => {
    try {
      const response = await axios.post(`${API_URL}/users`, {
        username,
        password,
      });
      localStorage.setItem("user", JSON.stringify(response.data.user));
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return { signupUser };
};
