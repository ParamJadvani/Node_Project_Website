import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

// Get token from cookies
export const getToken = () => {
  const token = Cookies.get("token");
  return token;
};

export const setToken = (token) => {
  Cookies.set("token", token, { expires: 1 / 24 });
};

// Remove a specific key from cookies
export const removeCookies = (key) => {
  Cookies.remove(key);
};
