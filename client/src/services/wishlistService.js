import axios from "axios";

const API_URL = "http://localhost:5001/api/wishlist";

const getToken = () => {
  return localStorage.getItem("token");
};

export const getWishlist = async () => {
  const response = await axios.get(API_URL, {
    headers: {
      authorization: getToken(),
    },
  });

  return response.data;
};

export const addToWishlist = async (productId) => {
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

export const removeWishlistItem = async (id) => {
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