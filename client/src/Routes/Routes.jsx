import React from "react";
import { Route, Routes as ParentRoute } from "react-router-dom";
import Home from "../pages/Home";
import UserSignup from "../pages/auth/Register/UserSignup";
import AdminSignup from "../pages/auth/Register/AdminSignup";
import Login from "../pages/auth/Login/Login";
import SuperAdminDashboard from "../pages/superadmin/SuperAdminDashboard";
import AdminDashBoard from "../pages/admin/AdminDashBoard";
import PrivateRoute from "./PrivateRoute";

const Routes = () => {
  return (
    <div>
      <ParentRoute>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/signup/user" element={<UserSignup />} />
        <Route path="/signup/admin" element={<AdminSignup />} />
        <Route path="/login" element={<Login />} />

        {/* Private Routes */}
        <Route
          path="/superAdmin/Dashboard"
          element={
            <PrivateRoute allowedRoles={["SUPERADMIN"]}>
              <SuperAdminDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/Dashboard"
          element={
            <PrivateRoute allowedRoles={["ADMIN"]}>
              <AdminDashBoard />
            </PrivateRoute>
          }
        />
      </ParentRoute>
    </div>
  );
};

export default Routes;
