import axios from "axios";

const API = axios.create({
  baseURL: "https://backend-test-app-latest.onrender.com/api",
  withCredentials: true, 
});

export const login = (credentials) => API.post("/login", credentials);
export const fetchUser = () => API.get("/user");
