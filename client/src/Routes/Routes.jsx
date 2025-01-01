import React from "react";
import { Route, Routes as ParentRoute } from "react-router-dom";
import Home from "../pages/Home";
import UserSignup from "../pages/auth/Register/UserSignup";
import AdminSignup from "../pages/auth/Register/AdminSignup";
import Login from "../pages/auth/Login/Login";
import SuperAdminDashboard from "../pages/superadmin/SuperAdminDashboard";
import AdminDashBoard from "../pages/admin/AdminDashBoard";
import { useSelector } from "react-redux";

const Routes = () => {
  const { user, isLogin, isActive } = useSelector((store) => store.userReducer);
  console.log(user, isLogin, isActive);
  return (
    <div>
      <ParentRoute>
        <Route path="/" element={<Home />} />
        <Route path="/signup/user" element={<UserSignup />} />
        <Route path="/signup/admin" element={<AdminSignup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/superAdmin/Dashboard" element={<SuperAdminDashboard />} />
        <Route path="/admin/Dashboard" element={<AdminDashBoard />} />
      </ParentRoute>
    </div>
  );
};

export default Routes;
