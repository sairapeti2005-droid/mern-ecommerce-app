import axios from "axios";
const API_URL =
  `${import.meta.env.VITE_API_URL}/payment`;

export const createPaymentOrder =
  async (amount) => {
    const response = await axios.post(
      `${API_URL}/create-order`,
      { amount }
    );

    return response.data;
  };