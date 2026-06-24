import axios from "axios";

const API_URL =
  `${import.meta.env.VITE_API_URL}/products`;

export const getProducts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const addProduct = async (product) => {
  const response = await axios.post(
    `${API_URL}/add`,
    product
  );

  return response.data;
};

export const updateProduct = async (id, product) => {
  const response = await axios.put(
    `${API_URL}/${id}`,
    product
  );

  return response.data;
};

export const deleteProduct = async (id) => {
  const response = await axios.delete(
    `${API_URL}/${id}`
  );

  return response.data;
};