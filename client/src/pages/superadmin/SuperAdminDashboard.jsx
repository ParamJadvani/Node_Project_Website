import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import Header from "../../components/Dashboard/Header";
import UserManagement from "../../components/Dashboard/UserManagement";

import AdminManagement from "../../components/Dashboard/AdminManagement";
import ProductManagement from "../../components/Dashboard/Product/ProductManagement";
import TabNavigation from "../../components/Dashboard/TabNavigatiion";

const SuperAdminDashboard = () => {
  const [activeTab, setActiveTab] = useState(2); // Default tab: Product Management

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <Box sx={{ p: 2 }}>
        <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
        {activeTab === 1 && <UserManagement />}
        {activeTab === 2 && <ProductManagement role="SuperAdmin" />}
        {activeTab === 3 && <AdminManagement />}
      </Box>
    </Box>
  );
};
export default SuperAdminDashboard;
