import { TextField, InputAdornment } from "@mui/material";
import { Controller } from "react-hook-form";

const InputField = ({
  control,
  name,
  label,
  rules,
  type = "text",
  error,
  helperText,
  icon, // Added icon prop
  ...rest
}) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <TextField
          {...field}
          label={label}
          variant="outlined"
          type={type}
          fullWidth
          error={error}
          helperText={helperText}
          InputLabelProps={{
            shrink: true, // Ensures label stays above the field even when empty
          }}
          InputProps={{
            startAdornment: icon ? (
              <InputAdornment position="start">{icon}</InputAdornment>
            ) : null, // Display icon if passed
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "16px", // Smooth rounded corners
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "primary.main", // Highlight border on hover
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderWidth: "2px", // Thicker border when focused
              },
            },
            "& .MuiInputBase-input": {
              padding: "14px", // Centering text vertically
              fontSize: "1rem", // Slightly larger font for better readability
            },
            "& .MuiFormHelperText-root": {
              color: error ? "error.main" : "text.secondary", // Dynamic color for helper text
            },
          }}
          {...rest} // Pass additional props
        />
      )}
    />
  );
};

export default InputField;
