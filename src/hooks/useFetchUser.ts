import { useContext, useEffect } from "react";
import UserContext from "../contexts/UserContext";
import axios from "axios";

const API_URL = "https://ghost-chat.liara.run/api"

const useFetchUser = (username: string) => {
  const { setUser } = useContext(UserContext)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${API_URL}/users/${username}`);
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, [username, setUser]);
};

export default useFetchUser;
