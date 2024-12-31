import axios from "axios";
// import { getToken } from "../Utils/Cookies";

const API = axios.create({
  baseURL: "http://localhost:3146",
  headers: {
    "Content-Type": "application/json",
  },
});

// API.interceptors.request.use((config) => {
//   const token = getToken();
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

export default API;
