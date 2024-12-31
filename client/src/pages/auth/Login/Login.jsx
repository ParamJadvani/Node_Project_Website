import React from "react";
import { Box, Container, Typography, Divider, Button } from "@mui/material";
import { LockOpenOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import AuthForm from "../../../components/AuthForm/AuthForm";
import { useDispatch, useSelector } from "react-redux";
import { loginAccount } from "../../../redux/slice/auth/AuthApi";
import { useTheme } from "@emotion/react";
import Navbar from "../../../components/Navbar";
import Alert from "../../../components/Alert";

const Login = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, user } = useSelector((store) => store.userReducer);

  isLoading
    ? Alert({
        isPending: true,
        type: "pending",
      })
    : null;

  // Handle Login Submit
  const handleLoginSubmit = async (data) => {
    try {
      await dispatch(loginAccount(data)).unwrap();
      // Show Success SweetAlert
      Alert({
        type: "success",
        message: "Login successful!",
        title: "Welcome Back",
        timer: 3000,
      });
      // user.role === "SUPERADMIN"
      //   ? navigate("/superAdmin/Dashboard")
      //   : navigate("/");
      navigate("/superAdmin/Dashboard");
    } catch (error) {
      Alert({
        type: "error",
        message: error.message || "Login failed!",
        title: "Error",
        timer: 3000,
      });
    }
  };

  return (
    <Box>
      {/* Navbar */}
      <Navbar />

      {/* Main Box */}
      <Box
        sx={{
          backgroundColor: theme.palette.background.default,
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "2rem 1rem",
        }}
      >
        {/* Card Container */}
        <Container
          maxWidth="sm"
          sx={{
            bgcolor: theme.palette.background.paper,
            padding: "2rem",
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
            borderRadius: theme.shape.borderRadius,
            animation: "fadeIn 0.8s ease-in-out",
            "@keyframes fadeIn": {
              "0%": { opacity: 0, transform: "scale(0.9)" },
              "100%": { opacity: 1, transform: "scale(1)" },
            },
          }}
        >
          {/* Header with Icon */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginBottom: "2rem",
            }}
          >
            <LockOpenOutlined
              sx={{
                fontSize: "3rem",
                color: theme.palette.primary.main,
                marginBottom: "0.5rem",
              }}
            />
            <Typography
              variant="h4"
              align="center"
              sx={{
                fontWeight: theme.typography.h1.fontWeight,
                color: theme.palette.primary.main,
              }}
            >
              Welcome Back
            </Typography>
            <Typography
              variant="body1"
              align="center"
              sx={{
                color: theme.palette.text.secondary,
                marginTop: "0.5rem",
              }}
            >
              Login to continue to your account
            </Typography>
          </Box>

          {/* Divider */}
          <Divider
            sx={{
              marginBottom: "2rem",
              borderColor: theme.palette.divider,
              opacity: 0.5,
            }}
          />

          {/* AuthForm Component */}
          <AuthForm isLogin={true} onSubmit={handleLoginSubmit} />

          {/* Footer Links */}
          <Box
            sx={{
              mt: 4,
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="body2"
              sx={{ mb: 1, color: theme.palette.text.secondary }}
            >
              Don't have an account?
            </Typography>
            <Button
              onClick={() => navigate("/signup/user")}
              variant="contained"
              sx={{
                textTransform: "none",
                fontWeight: theme.typography.button.fontWeight,
                backgroundColor: theme.palette.primary.main,
                borderRadius: "30px",
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                "&:hover": {
                  backgroundColor: theme.palette.primary.dark,
                  transform: "scale(1.05)",
                },
                "&:active": {
                  transform: "scale(1)",
                },
                transition: "transform 0.2s ease-in-out",
              }}
            >
              Sign up here
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Login;
