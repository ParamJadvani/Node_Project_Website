import { Link, useNavigate } from "react-router-dom";
import { Box, Container, Typography } from "@mui/material";
import Navbar from "../Components/Navbar";
import UserForm from "../Components/UserForm";
import UserAPI from "../API/User.API";

const Signup = ({ role }) => {
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    try {
      await UserAPI.signup(data);
      navigate("/");
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  return (
    <Box>
      <Navbar />
      <Container maxWidth="sm" sx={{ mt: 3 }}>
        <UserForm defaultRole={role} onSubmit={handleSubmit} />
        <Box sx={{ mt: 2, textAlign: "center" }}>
          {role === "USER" ? (
            <Typography variant="body2">
              For creating an Admin account,{" "}
              <Link to="/signup/admin">click here</Link>.
            </Typography>
          ) : (
            <Typography variant="body2">
              For creating a User account,{" "}
              <Link to="/signup/user">click here</Link>.
            </Typography>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default Signup;
