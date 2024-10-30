import { useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:3000/api";

const useGetMessages = (username: string) => {
  useEffect(() => {
    const fetchMsg = async () => {
      try {
        const response = await axios.get(`${API_URL}/messages/getMessages`, {
          params: { username },
        });
        const user = JSON.parse(localStorage.getItem("user") || "null");
        if (user.username) {
          user.messages = response.data.messages;
          localStorage.setItem("user", JSON.stringify(user));
        }
      } catch (error) {
        console.error("Error fetching user messages:", error);
      }
    };

    fetchMsg();
  }, [username]);
};

export default useGetMessages;
