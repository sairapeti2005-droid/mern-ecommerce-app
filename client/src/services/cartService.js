import axios from "axios";

const API_URL = "http://localhost:5001/api/cart";

const getToken = () => {
  return localStorage.getItem("token");
};

export const getCart = async () => {
  const response = await axios.get(API_URL, {
    headers: {
      authorization: getToken(),
    },
  });

  return response.data;
};

export const addToCart = async (productId) => {
  const response = await axios.post(
    `${API_URL}/add`,
    { productId },
    {
      headers: {
        authorization: getToken(),
      },
    }
  );

  return response.data;
};

export const updateCartItem = async (
  id,
  quantity
) => {
  const response = await axios.put(
    `${API_URL}/${id}`,
    { quantity },
    {
      headers: {
        authorization: getToken(),
      },
    }
  );

  return response.data;
};

export const removeCartItem = async (id) => {
  const response = await axios.delete(
    `${API_URL}/${id}`,
    {
      headers: {
        authorization: getToken(),
      },
    }
  );

  return response.data;
};