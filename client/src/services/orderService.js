import axios from "axios";

const API_URL =
"https://mern-ecommerce-app-w7nr.onrender.com/api/orders";
const getToken = () => {
  return localStorage.getItem("token");
};

export const placeOrder = async () => {
  const response = await axios.post(
    `${API_URL}/place`,
    {},
    {
      headers: {
        authorization: getToken(),
      },
    }
  );

  return response.data;
};

export const getMyOrders = async () => {
  const response = await axios.get(
    `${API_URL}/my-orders`,
    {
      headers: {
        authorization: getToken(),
      },
    }
  );

  return response.data;
};

export const getAllOrders = async () => {
  const response = await axios.get(
    `${API_URL}/all`,
    {
      headers: {
        authorization: getToken(),
      },
    }
  );

  return response.data;
};

export const updateOrderStatus = async (
  orderId,
  status
) => {
  const response = await axios.put(
    `${API_URL}/status/${orderId}`,
    { status },
    {
      headers: {
        authorization: getToken(),
      },
    }
  );

  return response.data;
};