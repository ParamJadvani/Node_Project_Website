import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

export const getToken = () => {
  const { token } = Cookies.get();
  return token;
};

export const getUserData = () => {
  const token = getToken();
  return token ? jwt_decode(token) : undefined;
};

export const removeCookies = (key) => {
  Cookies.remove(key);
};

export const isAdmin = () => {
  const decodedToken = getUserData();
  return decodedToken?.role === "ADMIN";
};

export const isSuperAdmin = () => {
  const decodedToken = getUserData();
  return decodedToken?.role === "SUPERADMIN";
};

export const isActiveAccount = () => {
  const decodedToken = getUserData();
  return decodedToken?.isActive;
};

export const useAuth = () => {
  const [token, setToken] = useState(getToken());
  const [userData, setUserData] = useState(getUserData());

  useEffect(() => {
    const newToken = getToken();
    setToken(newToken);
    if (newToken) {
      setUserData(jwt_decode(newToken));
    }
  }, [token]);

  return { token, userData };
};

export default getUserData;
