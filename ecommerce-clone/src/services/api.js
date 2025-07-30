import axios from "axios";

const api = axios.create({
  baseURL: "https://api.escuelajs.co/api/v1", // Platzi Fake Store API
});

export default api;