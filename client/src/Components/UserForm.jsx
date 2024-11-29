import { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import { Box } from "@mui/system";
import { Controller, useForm } from "react-hook-form";

const UserForm = ({ defaultRole = "USER", onSubmit }) => {
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
        maxWidth: "lg",
        mx: "auto",
        my: 3,
        p: 3,
        bgcolor: "#fff",
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        {defaultRole === "USER" ? "User Signup" : "Admin Signup"}
      </Typography>

      <form onSubmit={handleSubmit(onFormSubmit)}>
        {/* Username */}
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Controller
              name="username"
              control={control}
              rules={{ required: "Username is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Username"
                  variant="outlined"
                  fullWidth
                  error={!!errors.username}
                  helperText={errors.username ? errors.username.message : ""}
                />
              )}
            />
          </Grid>

          {/* Email */}
          <Grid item xs={12}>
            <Controller
              name="email"
              control={control}
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                  message: "Invalid email format",
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Email"
                  variant="outlined"
                  fullWidth
                  error={!!errors.email}
                  helperText={errors.email ? errors.email.message : ""}
                />
              )}
            />
          </Grid>

          {/* Password */}
          <Grid item xs={12}>
            <Controller
              name="password"
              control={control}
              rules={{
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Password"
                  variant="outlined"
                  type="password"
                  fullWidth
                  error={!!errors.password}
                  helperText={errors.password ? errors.password.message : ""}
                />
              )}
            />
          </Grid>

          {/* Number */}
          <Grid item xs={12} sm={6}>
            <Controller
              name="number"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Number"
                  variant="outlined"
                  type="number"
                  fullWidth
                />
              )}
            />
          </Grid>

          {/* Profile Picture */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Profile Picture</InputLabel>
              <input
                type="file"
                name="profile"
                onChange={handleFileChange}
                accept="image/*"
                style={{ padding: "8px 0", display: "block", width: "100%" }}
              />
            </FormControl>
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ py: 1.5 }}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default UserForm;
