import { useState } from "react";
import {
  Button,
  Grid,
  Typography,
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useForm } from "react-hook-form";
import InputField from "./InputField"; // Import the InputField component

const UserForm = ({ defaultRole = "USER", onSubmit, isLogin = false }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: defaultRole,
    number: 0,
    profile: null,
  });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: files[0] }));
  };

  const onFormSubmit = async (data) => {
    await onSubmit(data);
    setFormData({
      username: "",
      email: "",
      password: "",
      role: defaultRole,
      number: 0,
      profile: null,
    });
  };

  return (
    <Box
      sx={{
        maxWidth: 600,
        mx: "auto",
        my: 3,
        p: 4,
        bgcolor: "#fff",
        boxShadow: 3,
        borderRadius: 3,
        [theme.breakpoints.down("sm")]: {
          p: 2,
          maxWidth: "90%",
        },
      }}
    >
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <Grid container spacing={3}>
          {/* Only show username if it's not login */}
          {!isLogin && (
            <Grid item xs={12}>
              <InputField
                name="username"
                label="Username"
                control={control}
                rules={{ required: "Username is required" }}
                error={!!errors.username}
                helperText={errors.username ? errors.username.message : ""}
              />
            </Grid>
          )}

          {/* Email */}
          <Grid item xs={12}>
            <InputField
              name="email"
              label="Email"
              control={control}
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                  message: "Invalid email format",
                },
              }}
              error={!!errors.email}
              helperText={errors.email ? errors.email.message : ""}
            />
          </Grid>

          {/* Password */}
          <Grid item xs={12}>
            <InputField
              name="password"
              label="Password"
              control={control}
              type="password"
              rules={{
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              }}
              error={!!errors.password}
              helperText={errors.password ? errors.password.message : ""}
            />
          </Grid>

          {/* Only show number and profile for signup */}
          {!isLogin && (
            <>
              {/* Number */}
              <Grid item xs={12} sm={6}>
                <InputField
                  name="number"
                  label="Number"
                  control={control}
                  type="number"
                  error={!!errors.number}
                  helperText={errors.number ? errors.number.message : ""}
                />
              </Grid>

              {/* Profile Picture */}
              <Grid item xs={12} sm={6}>
                <input
                  type="file"
                  name="profile"
                  onChange={handleFileChange}
                  accept="image/*"
                  style={{
                    padding: "8px 0",
                    display: "block",
                    width: "100%",
                    borderRadius: "12px",
                    border: "1px solid #ccc",
                    outline: "none",
                  }}
                />
              </Grid>
            </>
          )}

          {/* Submit Button */}
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                py: 1.5,
                borderRadius: "12px",
                fontSize: "1.1rem",
                "&:hover": { backgroundColor: "#3f51b5" },
              }}
            >
              {isLogin ? "Login" : "Sign Up"}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default UserForm;
