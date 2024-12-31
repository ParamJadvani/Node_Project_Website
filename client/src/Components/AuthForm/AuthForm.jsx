import { useRef } from "react";
import { Button, Grid, Box, useMediaQuery, useTheme } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import InputField from "./InputField";
import { Person, Email, Lock, Phone } from "@mui/icons-material";

const AuthForm = ({ defaultRole = "USER", onSubmit, isLogin = false }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const fileInputRef = useRef(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Common styles and settings
  const commonIconColor = theme.palette.primary.main;
  const commonButtonStyle = {
    py: 1.5,
    borderRadius: "12px",
    fontSize: "1.1rem",
    backgroundColor: theme.palette.primary.main,
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
      transform: "scale(1.05)",
      transition: "all 0.3s ease-in-out",
    },
    "&:active": {
      transform: "scale(1)",
    },
  };

  const onFormSubmit = async (data) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => formData.append(key, data[key]));
    formData.append("role", defaultRole);
    await onSubmit(formData);
    !isLogin ? (fileInputRef.current.value = "") : null;
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
        animation: "fadeIn 0.8s ease-in-out",
        "@keyframes fadeIn": {
          "0%": { opacity: 0, transform: "scale(0.9)" },
          "100%": { opacity: 1, transform: "scale(1)" },
        },
        [theme.breakpoints.down("sm")]: {
          p: 2,
          maxWidth: "90%",
        },
      }}
    >
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <Grid container spacing={3}>
          {/* Username (Signup only) */}
          {!isLogin && (
            <Grid item xs={12}>
              <InputField
                name="username"
                label="Username"
                control={control}
                rules={{ required: "Username is required" }}
                error={!!errors.username}
                helperText={errors.username?.message || ""}
                icon={<Person sx={{ color: commonIconColor }} />}
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
              helperText={errors.email?.message || ""}
              icon={<Email sx={{ color: commonIconColor }} />}
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
              helperText={errors.password?.message || ""}
              icon={<Lock sx={{ color: commonIconColor }} />}
            />
          </Grid>

          {/* Number and Profile (Signup only) */}
          {!isLogin && (
            <>
              <Grid item xs={12} sm={6}>
                <InputField
                  name="number"
                  label="Number"
                  control={control}
                  type="number"
                  error={!!errors.number}
                  helperText={errors.number?.message || ""}
                  icon={<Phone sx={{ color: commonIconColor }} />}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Controller
                  name="profile"
                  control={control}
                  rules={{ required: "Profile picture is required" }}
                  render={({ field }) => (
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={(e) => field.onChange(e.target.files[0])}
                      style={{
                        padding: "8px 0",
                        display: "block",
                        width: "100%",
                        borderRadius: "12px",
                        border: "1px solid #ccc",
                        outline: "none",
                        transition: "all 0.3s ease-in-out",
                        "&:hover": {
                          borderColor: theme.palette.primary.main,
                        },
                      }}
                    />
                  )}
                />
                {errors.profile && (
                  <span style={{ color: "red" }}>{errors.profile.message}</span>
                )}
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
              sx={commonButtonStyle}
            >
              {isLogin ? "Login" : "Sign Up"}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default AuthForm;
