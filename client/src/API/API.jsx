import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3146",
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;