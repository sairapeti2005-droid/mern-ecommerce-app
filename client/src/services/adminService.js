import axios from "axios";

const API_URL =
  `${import.meta.env.VITE_API_URL}/admin`;

const getToken = () => {
  return localStorage.getItem("token");
};

export const getAdminStats =
  async () => {
    const response = await axios.get(
      `${API_URL}/stats`,
      {
        headers: {
          authorization: getToken(),
        },
      }
    );

    return response.data;
  };