import Cookies from "js-cookie";
import API from "../API";


const setToken = (token) => {
  // Set token and isVerified to cookies with proper expiration
  Cookies.set("token", token, { expires: 1 / 24 }); // 1 hour expiration
  Cookies.set("isVerified", true);
};

const handleError = (error) => {
  // Generalized error handling
  console.error("Error:", error.response?.data || error.message);
  return error.response?.data || error.message;
};

export const UserAPI = {
  signup: async (user, navigate) => {
    try {
      const { data } = await API.post("/users/signup", user);
      setToken(data.token);
      navigate("/"); // Redirect on successful signup
    } catch (error) {
      handleError(error);
    }
  },

  login: async (user, navigate) => {
    try {
      const { data } = await API.post("/users/login", user);
      if (data.isActive) {
        setToken(data.token);
        navigate("/"); // Redirect on successful login
      } else {
        alert("Your account is not activated.");
      }
    } catch (error) {
      handleError(error);
    }
  },

  getUsers: async () => {
    try {
      const { data } = await API.get("/users");
      return data; // Return users data
    } catch (error) {
      return handleError(error); // Return error message
    }
  },

  getUser: async (id) => {
    try {
      const { data } = await API.get(`/users/${id}`);
      return data; // Return specific user data
    } catch (error) {
      return handleError(error); // Return error message
    }
  },

  deleteUser: async (id) => {
    try {
      const { data } = await API.delete(`/users/${id}`);
      console.log(`User with ID ${id} deleted successfully.`);
      return data; // Return success data
    } catch (error) {
      return handleError(error); // Return error message
    }
  },
};

export default UserAPI;
