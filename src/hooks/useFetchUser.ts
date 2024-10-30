import { useEffect } from "react";
import axios from "axios";

const API_URL = "https://ghost-chat.liara.run/api"

const useFetchUser = (username: string) => {

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${API_URL}/users/${username}`);
        localStorage.setItem('user', JSON.stringify(response.data.user))
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, [username]);
};

export default useFetchUser;
