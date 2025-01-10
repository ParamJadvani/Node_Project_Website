import React, { useEffect } from "react";
import { Route, Routes as ParentRoute, useNavigate } from "react-router-dom";
import Home from "../pages/Home";
import UserSignup from "../pages/auth/Register/UserSignup";
import AdminSignup from "../pages/auth/Register/AdminSignup";
import Login from "../pages/auth/Login/Login";
import SuperAdminDashboard from "../pages/superadmin/SuperAdminDashboard";
import AdminDashBoard from "../pages/admin/AdminDashBoard";
import PrivateRoute from "./PrivateRoute";
import { useSelector } from "react-redux";

const Routes = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.userReducer);
  useEffect(() => {
    if (user.role === "SUPERADMIN") {
      navigate("/superAdmin/Dashboard");
    } else if (user.role === "ADMIN") {
      navigate("/admin/Dashboard");
    } else {
      navigate("/");
    }
  }, [user.role]);
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
