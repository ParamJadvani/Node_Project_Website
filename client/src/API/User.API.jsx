import Cookies from "js-cookie";
import API from "./API";

export const UserAPI = {
  signup: async (user, navigate) => {
    try {
      const { data } = await API.post("/users/signup", user);
      Cookies.set("token", data.token, { expires: 1 / 24 });
      Cookies.set("isVerified", data.isVerified);
      console.log(data); // Log the data after it is fetched
      navigate("/"); // Use the navigate function passed as argument
    } catch (error) {
      console.error("Failed to sign up", error.response?.data || error.message);
    }
  },

  login: async (user, navigate) => {
    try {
      const { data } = await API.post("/users/login", user);
      if (data.isActive) {
        Cookies.set("token", data.token, { expires: 1 / 24 });
        Cookies.set("isVerified", data.isVerified);
        navigate("/"); // Use the navigate function passed as argument
      } else {
        alert("Your account is not activated.");
      }
    } catch (error) {
      console.error("Failed to log in", error.response?.data || error.message);
    }
  },

  getUsers: async () => {
    try {
      const { data } = await API.get("/users");
      return data;
    } catch (error) {
      console.error(
        "Failed to fetch users",
        error.response?.data || error.message
      );
    }
  },

  getUser: async (id) => {
    try {
      const { data } = await API.get(`/users/${id}`);
      return data;
    } catch (error) {
      console.error(
        `Failed to fetch user with ID: ${id}`,
        error.response?.data || error.message
      );
    }
  },

  deleteUser: async (id) => {
    try {
      const { data } = await API.delete(`/users/${id}`);
      console.log(`User with ID ${id} deleted successfully.`);
      return data;
    } catch (error) {
      console.error(
        `Failed to delete user with ID: ${id}`,
        error.response?.data || error.message
      );
    }
  },
};

export default UserAPI;
