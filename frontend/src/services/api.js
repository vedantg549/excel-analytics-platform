import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("excel_token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const register = (data) => API.post("/api/register", data);
export const login = (data) => API.post("/api/login", data);

export default API;
