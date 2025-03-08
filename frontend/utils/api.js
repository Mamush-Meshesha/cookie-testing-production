import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true, 
});

export const login = (credentials) => API.post("/login", credentials);
export const fetchUser = () => API.get("/user");
