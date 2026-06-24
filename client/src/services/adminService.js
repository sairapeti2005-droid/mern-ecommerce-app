import axios from "axios";

const API_URL =
  "http://localhost:5001/api/admin";

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