import axios from "axios";
const API_URL =
"https://mern-ecommerce-app-w7nr.onrender.com/api/payment";

export const createPaymentOrder =
  async (amount) => {
    const response = await axios.post(
      `${API_URL}/create-order`,
      { amount }
    );

    return response.data;
  };