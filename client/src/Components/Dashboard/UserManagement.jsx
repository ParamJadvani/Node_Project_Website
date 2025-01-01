import React, { useState } from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const UserManagement = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "User X", email: "userX@example.com", role: "User" },
    { id: 2, name: "User Y", email: "userY@example.com", role: "User" },
  ]);

  const addUser = () => {
    setUsers((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        name: "New User",
        email: "newuser@example.com",
        role: "User",
      },
    ]);
  };

  const userColumns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "email", headerName: "Email", width: 300 },
    { field: "role", headerName: "Role", width: 150 },
  ];

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          User Management
        </Typography>
        <DataGrid rows={users} columns={userColumns} pageSize={5} autoHeight />
        <Button variant="contained" sx={{ mt: 2 }} onClick={addUser}>
          Add User
        </Button>
      </CardContent>
    </Card>
  );
};

export default UserManagement;
