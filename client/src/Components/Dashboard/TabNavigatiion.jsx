import React from "react";
import { Box, Button } from "@mui/material";

const TabNavigation = ({ activeTab, setActiveTab }) => {
  return (
    <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
      <Button
        variant={activeTab === 1 ? "contained" : "outlined"}
        onClick={() => setActiveTab(1)}
      >
        User Management
      </Button>
      <Button
        variant={activeTab === 2 ? "contained" : "outlined"}
        onClick={() => setActiveTab(2)}
      >
        Product Management
      </Button>
      <Button
        variant={activeTab === 3 ? "contained" : "outlined"}
        onClick={() => setActiveTab(3)}
      >
        Admin Management
      </Button>
    </Box>
  );
};

export default TabNavigation;
