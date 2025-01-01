import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Modal,
  Box,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const AdminManagement = () => {
  const [admins, setAdmins] = useState([
    {
      id: 1,
      name: "Admin A",
      email: "adminA@example.com",
      role: "Admin",
      blocked: false, // Account is not blocked
      products: ["Product 1", "Product 2"], // Example product list for Admin A
    },
    {
      id: 2,
      name: "Admin B",
      email: "adminB@example.com",
      role: "Admin",
      blocked: false, // Account is not blocked
      products: ["Product 3"], // Example product list for Admin B
    },
  ]);
  const [selectedAdmin, setSelectedAdmin] = useState(null); // Store the selected admin
  const [open, setOpen] = useState(false); // Modal open state

  const addAdmin = () => {
    setAdmins((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        name: `New Admin ${prev.length + 1}`,
        email: `newadmin${prev.length + 1}@example.com`,
        role: "Admin",
        blocked: false,
        products: [],
      },
    ]);
  };

  const adminColumns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "email", headerName: "Email", width: 300 },
    { field: "role", headerName: "Role", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      width: 300,
      renderCell: (params) => (
        <div>
          <Button
            variant="contained"
            color="success"
            size="small"
            onClick={() => handleAdminClick(params.row)}
            sx={{ mr: 1 }}
          >
            View Details
          </Button>
          <Button
            variant="contained"
            color="error"
            size="small"
            onClick={() => toggleBlockAdmin(params.row.id)}
            disabled={params.row.blocked}
          >
            Block
          </Button>
          <Button
            variant="contained"
            color="success"
            size="small"
            onClick={() => toggleUnblockAdmin(params.row.id)}
            disabled={!params.row.blocked}
          >
            Unblock
          </Button>
        </div>
      ),
    },
  ];

  const handleAdminClick = (admin) => {
    setSelectedAdmin(admin); // Set the selected admin's details
    setOpen(true); // Open the modal
  };

  const toggleBlockAdmin = (id) => {
    setAdmins((prev) =>
      prev.map((admin) =>
        admin.id === id
          ? {
              ...admin,
              blocked: true,
            }
          : admin
      )
    );
  };

  const toggleUnblockAdmin = (id) => {
    setAdmins((prev) =>
      prev.map((admin) =>
        admin.id === id
          ? {
              ...admin,
              blocked: false,
            }
          : admin
      )
    );
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedAdmin(null);
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Admin Management
        </Typography>
        <DataGrid
          rows={admins}
          columns={adminColumns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          autoHeight
        />
        <Button variant="contained" sx={{ mt: 2 }} onClick={addAdmin}>
          Add Admin
        </Button>
      </CardContent>

      {/* Modal to display admin details */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="admin-details-modal"
        aria-describedby="admin-details-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: 4,
            borderRadius: 2,
            boxShadow: 24,
            width: 400,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Admin Details
          </Typography>
          {selectedAdmin && (
            <>
              <Typography variant="body1">
                Name: {selectedAdmin.name}
              </Typography>
              <Typography variant="body1">
                Email: {selectedAdmin.email}
              </Typography>
              <Typography variant="body1">
                Role: {selectedAdmin.role}
              </Typography>
              <Typography variant="body1">
                Blocked: {selectedAdmin.blocked ? "Yes" : "No"}
              </Typography>
              <Typography variant="body1">Products Created:</Typography>
              <ul>
                {selectedAdmin.products.map((product, index) => (
                  <li key={index}>{product}</li>
                ))}
              </ul>
            </>
          )}
          <Button
            variant="contained"
            color="primary"
            onClick={handleClose}
            sx={{ mt: 2 }}
          >
            Close
          </Button>
        </Box>
      </Modal>
    </Card>
  );
};

export default AdminManagement;
