import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";

const InputField = ({
  control,
  name,
  label,
  rules,
  type = "text",
  error,
  helperText,
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
          sx={{
            "& .MuiInputBase-root": { borderRadius: "12px" },
            "& .MuiInputBase-input": {
              paddingTop: "12px", // Centering placeholder vertically
              paddingBottom: "12px", // Centering placeholder vertically
            },
          }}
          {...rest} // Any additional props passed to the component (e.g., for styling)
        />
      )}
    />
  );
};

export default InputField;
