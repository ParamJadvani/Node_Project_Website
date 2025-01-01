import React from "react";
import { Typography } from "@mui/material";

const Header = () => {
  return (
    <Typography
      variant="h4"
      gutterBottom
      sx={{
        p: 3,
        backgroundColor: "#172831",
        color: "#fff",
        fontWeight: "bold",
      }}
    >
      SuperAdmin Dashboard
    </Typography>
  );
};

export default Header;
