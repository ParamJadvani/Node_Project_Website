import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../Screens/Home";
import Signup from "../Screens/Signup";
import Login from "../Screens/Login";

const Router = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup/user" element={<Signup role={"USER"} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup/admin" element={<Signup role={"ADMIN"} />} />
      </Routes>
    </div>
  );
};

export default Router;
