import React from "react";
import Navbar from "../Components/Navbar";
import { Box, Container, Typography, useTheme } from "@mui/material";
import UserForm from "../Components/Form/UserForm"; // Import the UserForm component
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const handleLoginSubmit = async (data) => {
    // Handle login logic here
    console.log(data);
    // On successful login, navigate to another page
    navigate("/dashboard"); // Redirect to dashboard or home after login
  };

  return (
    <Box>
      <Navbar />

      <Box
        sx={{
          backgroundColor: theme.palette.background.default,
          maxHeight: "90vh",
          height: "100vh", // Ensure the height is fixed at 100vh
          paddingTop: "3rem", // Add space for the navbar
        }}
      >
        <Container
          maxWidth="sm"
          sx={{
            bgcolor: "#fff",
            padding: "2rem",
            boxShadow: 3,
            borderRadius: 3,
            marginTop: "5rem", // Center the login box vertically
            [theme.breakpoints.down("sm")]: {
              padding: "1rem",
              marginTop: "3rem",
            },
          }}
        >
          <Typography
            variant="h4"
            align="center"
            sx={{
              fontWeight: 600,
              marginBottom: "2rem",
              color: theme.palette.primary.main,
            }}
          >
            Login
          </Typography>

          {/* Call UserForm Component for Login */}
          <UserForm isLogin={true} onSubmit={handleLoginSubmit} />

          <Box
            sx={{
              mt: 2,
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="body2" sx={{ mb: 1 }}>
              Don't have an account?
            </Typography>
            <Typography
              component="span"
              variant="body2"
              sx={{
                color: theme.palette.primary.main,
                fontWeight: 600,
                textDecoration: "underline",
                cursor: "pointer",
              }}
              onClick={() => navigate("/signup/user")}
            >
              Sign up here
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Login;
