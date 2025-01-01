import { Link, useNavigate } from "react-router-dom";
import { Box, Container, Typography, Button, Divider } from "@mui/material";
import { AdminPanelSettings, PersonAdd } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { createAccount } from "../../../redux/slice/auth/AuthApi";
import { useTheme } from "@mui/material/styles";
import Navbar from "../../../components/Navbar";
import AuthForm from "../../../components/AuthForm/AuthForm";
import Alert from "../../../components/Alert";

const UserSignup = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoading } = useSelector((store) => store.userReducer);

  isLoading
    ? Alert({
        isPending: true,
        type: "pending",
        message: "Please wait...",
      })
    : null;

  const handleSubmit = async (data) => {
    try {
      // Attempt to create the user account
      await dispatch(createAccount(data)).unwrap();
      // Set success alert
      Alert({
        show: true,
        title: "Success!",
        text: "User account created successfully!",
        icon: "success",
      });
      navigate("/");
    } catch (error) {
      Alert({
        show: true,
        type: "error",
        message: error.toString(),
        title: "Error",
        showConfirmButton: true, // Explicitly set to true
        confirmButtonText: "Try Again",
        isPending: false, // Ensure isPending is false when the button should appear
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
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: theme.palette.background.default,
          padding: "2rem 1rem",
        }}
      >
        {/* Signup Card */}
        <Container
          maxWidth="sm"
          sx={{
            bgcolor: theme.palette.background.paper,
            padding: "3rem",
            boxShadow: "0px 12px 30px rgba(0, 0, 0, 0.15)",
            borderRadius: "16px",
            animation: "fadeIn 1s ease-out",
            "@keyframes fadeIn": {
              "0%": { opacity: 0, transform: "translateY(40px)" },
              "100%": { opacity: 1, transform: "translateY(0)" },
            },
            transition: "transform 0.3s ease-in-out",
            "&:hover": {
              transform: "scale(1.03)",
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
            <PersonAdd
              sx={{
                fontSize: "3rem",
                color: theme.palette.primary.main,
                marginBottom: "1rem",
              }}
            />
            <Typography
              variant="h4"
              align="center"
              sx={{
                fontWeight: theme.typography.h1.fontWeight,
                color: theme.palette.primary.main,
                textShadow: "2px 2px 5px rgba(0, 0, 0, 0.2)",
              }}
            >
              User Signup
            </Typography>
            <Typography
              variant="body1"
              align="center"
              sx={{
                color: theme.palette.text.secondary,
                marginTop: "0.5rem",
                fontStyle: "italic",
              }}
            >
              Create a new user account to explore the platform
            </Typography>
          </Box>

          {/* Divider */}
          <Divider
            sx={{
              borderColor: theme.palette.divider,
              marginBottom: "2rem",
            }}
          />

          {/* AuthForm Component */}
          <AuthForm defaultRole="USER" onSubmit={handleSubmit} />

          {/* Footer Links */}
          <Box
            sx={{
              mt: 4,
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              variant="body2"
              sx={{ mb: 1, color: theme.palette.text.secondary }}
            >
              Already have an account?
            </Typography>
            <Button
              component={Link}
              to="/login"
              variant="contained"
              sx={{
                ...theme.typography.button,
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
                "&:hover": {
                  backgroundColor: theme.palette.primary.dark,
                  transform: "scale(1.05)",
                },
                transition: "transform 0.2s ease-in-out",
              }}
            >
              Login
            </Button>

            {/* New Button to Navigate to Admin Signup */}
            <Typography
              variant="body2"
              sx={{
                mt: 2,
                mb: 1,
                color: theme.palette.text.secondary,
              }}
            >
              Want to create an Admin account?
            </Typography>
            <Button
              component={Link}
              to="/signup/admin"
              variant="contained"
              sx={{
                ...theme.typography.button,
                backgroundColor: theme.palette.secondary.main,
                color: theme.palette.secondary.contrastText,
                "&:hover": {
                  backgroundColor: theme.palette.secondary.dark,
                  transform: "scale(1.05)",
                },
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "fit-content",
                transition: "transform 0.2s ease-in-out",
              }}
            >
              <AdminPanelSettings sx={{ marginRight: "8px" }} />
              Sign up as Admin
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default UserSignup;