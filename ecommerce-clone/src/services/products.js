import api from "./api";

// Get all products
export const getProducts = async () => {
  const res = await api.get("/products");
  return res.data;
};

// Get single product by ID
export const getProductById = async (id) => {
  const res = await api.get(`/products/${id}`);
  return res.data;
};
