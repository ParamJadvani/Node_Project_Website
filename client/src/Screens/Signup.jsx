import { Link, useNavigate } from "react-router-dom";
import { Box, Container, Typography, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Navbar from "../Components/Navbar";
import UserForm from "../Components/Form/UserForm";
import UserAPI from "../API/UserApi/User.Api";

const Signup = ({ role }) => {
  const navigate = useNavigate();
  const theme = useTheme();

  const handleSubmit = async (data) => {
    try {
      await UserAPI.signup(data);
      navigate("/"); // Redirect to homepage after signup
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  return (
    <Box>
      <Navbar />

      <Box
        sx={{
          backgroundColor: theme.palette.background.default,
          maxHeight: "90vh",
          height: "100vh", // Ensure the height is fixed at 100vh
          overflow: "hidden", // Prevent scrolling on the entire page
          display: "flex", // Use flexbox for centering the content
          flexDirection: "column", // Stack the items vertically
          justifyContent: "center", // Center the content vertically
        }}
      >
        <Container
          maxWidth="sm"
          sx={{
            px: 2,
            py: 3,
            bgcolor: "#fff",
            boxShadow: 3,
            borderRadius: 2,
            [theme.breakpoints.down("sm")]: {
              mt: 3,
              px: 1,
            },
          }}
        >
          <Typography
            variant="h4"
            align="center"
            sx={{
              mb: 4,
              fontWeight: 600,
              color: theme.palette.primary.main,
            }}
          >
            {role === "USER" ? "User Signup" : "Admin Signup"}
          </Typography>

          {/* UserForm Component */}
          <UserForm defaultRole={role} onSubmit={handleSubmit} />

          {/* Conditional Link Text */}
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
            {role === "USER" ? (
              <>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Already have an account?
                </Typography>
                <Button
                  component={Link}
                  to="/login"
                  variant="outlined"
                  color="primary"
                  sx={{
                    textDecoration: "none",
                    fontSize: "1rem",
                    borderRadius: "20px",
                    fontWeight: 600,
                    "&:hover": {
                      backgroundColor: theme.palette.primary.light,
                    },
                  }}
                >
                  Login
                </Button>
                {/* Link to Admin Signup */}
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Want to create an admin account?
                </Typography>
                <Button
                  component={Link}
                  to="/signup/admin"
                  variant="outlined"
                  color="primary"
                  sx={{
                    textDecoration: "none",
                    fontSize: "1rem",
                    borderRadius: "20px",
                    fontWeight: 600,
                    "&:hover": {
                      backgroundColor: theme.palette.primary.light,
                    },
                  }}
                >
                  Sign up as Admin
                </Button>
              </>
            ) : (
              <>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Want to create a User account?
                </Typography>
                <Button
                  component={Link}
                  to="/signup/user"
                  variant="outlined"
                  color="primary"
                  sx={{
                    textDecoration: "none",
                    fontSize: "1rem",
                    borderRadius: "20px",
                    fontWeight: 600,
                    "&:hover": {
                      backgroundColor: theme.palette.primary.light,
                    },
                  }}
                >
                  Sign up as User
                </Button>
              </>
            )}
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Signup;
