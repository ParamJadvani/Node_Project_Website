import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Modal,
  Card,
  CardContent,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

// Header Component
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

// TabNavigation Component
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

// UserManagement Component
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

// AdminManagement Component
const AdminManagement = () => {
  const [admins, setAdmins] = useState([
    {
      id: 1,
      name: "Admin A",
      email: "adminA@example.com",
      role: "Admin",
      blocked: false,
      products: ["Product 1", "Product 2"],
    },
    {
      id: 2,
      name: "Admin B",
      email: "adminB@example.com",
      role: "Admin",
      blocked: false,
      products: ["Product 3"],
    },
  ]);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [open, setOpen] = useState(false);

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
    setSelectedAdmin(admin);
    setOpen(true);
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

      {/* Modal for Admin Details */}
      <Modal open={open} onClose={handleClose}>
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

// ProductManagement Component
const ProductManagement = ({ role, loggedInAdmin, onProductCreate }) => {
  const [purchaseHistoryModal, setPurchaseHistoryModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Product 1",
      company: "Company A",
      isApproved: false,
      createdBy: "Admin A",
      purchaseHistory: [
        { id: 1, buyer: "User X", date: "2024-12-30", amount: "$100" },
        { id: 2, buyer: "User Y", date: "2024-12-31", amount: "$200" },
      ],
    },
    {
      id: 2,
      name: "Product 2",
      company: "Company B",
      isApproved: true,
      createdBy: "Admin B",
      purchaseHistory: [
        { id: 3, buyer: "User Z", date: "2024-12-25", amount: "$300" },
      ],
    },
  ]);

  const filteredProducts =
    role === "SuperAdmin"
      ? products
      : products.filter((product) => product.createdBy === loggedInAdmin);

  const openPurchaseHistoryModal = (product) => {
    if (role === "Admin" && product.createdBy !== loggedInAdmin) {
      alert("You cannot view this product's purchase history.");
      return;
    }
    setSelectedProduct(product);
    setPurchaseHistoryModal(true);
  };

  const closePurchaseHistoryModal = () => {
    setPurchaseHistoryModal(false);
    setSelectedProduct(null);
  };

  const toggleApprovalStatus = (productId, status) => {
    const updatedProducts = products.map((product) =>
      product.id === productId ? { ...product, isApproved: status } : product
    );
    setProducts(updatedProducts);
  };

  const createProduct = () => {
    onProductCreate();
  };

  return (
    <Box>
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Product Management
          </Typography>
          <Button variant="contained" color="primary" onClick={createProduct}>
            Create New Product
          </Button>
          <Box mt={3}>
            <Typography variant="body1">Products List</Typography>
            {filteredProducts.map((product) => (
              <Box
                key={product.id}
                mb={2}
                sx={{ border: "1px solid #ddd", borderRadius: 2, p: 2 }}
              >
                <Typography variant="body2">{product.name}</Typography>
                <Typography variant="body2">
                  Company: {product.company}
                </Typography>
                <Typography
                  variant="body2"
                  color={product.isApproved ? "green" : "red"}
                >
                  Status: {product.isApproved ? "Approved" : "Pending Approval"}
                </Typography>
                <Button
                  variant="contained"
                  size="small"
                  sx={{ mt: 1 }}
                  onClick={() => openPurchaseHistoryModal(product)}
                >
                  View Purchase History
                </Button>
                {role === "SuperAdmin" && (
                  <Box sx={{ mt: 2 }}>
                    <Button
                      variant="contained"
                      color="success"
                      size="small"
                      onClick={() => toggleApprovalStatus(product.id, true)}
                    >
                      Approve
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      sx={{ ml: 2 }}
                      onClick={() => toggleApprovalStatus(product.id, false)}
                    >
                      Reject
                    </Button>
                  </Box>
                )}
              </Box>
            ))}
          </Box>
        </CardContent>
      </Card>

      {/* Purchase History Modal */}
      <Modal open={purchaseHistoryModal} onClose={closePurchaseHistoryModal}>
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
            Purchase History for {selectedProduct?.name}
          </Typography>
          {selectedProduct && selectedProduct.purchaseHistory.length > 0 ? (
            <Box>
              <ul>
                {selectedProduct.purchaseHistory.map((purchase) => (
                  <li key={purchase.id}>
                    {purchase.buyer} - {purchase.date} - {purchase.amount}
                  </li>
                ))}
              </ul>
            </Box>
          ) : (
            <Typography variant="body2">
              No purchase history available.
            </Typography>
          )}
          <Button
            variant="contained"
            color="primary"
            onClick={closePurchaseHistoryModal}
            sx={{ mt: 2 }}
          >
            Close
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

// SuperAdminDashboard Component
const SuperAdminDashboard = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [loggedInAdmin, setLoggedInAdmin] = useState("Admin A");
  const [role] = useState("SuperAdmin");

  const handleProductCreate = () => {
    alert("Navigate to product creation page.");
  };

  return (
    <Box sx={{ p: 3 }}>
      <Header />
      <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === 1 && <UserManagement />}
      {activeTab === 2 && (
        <ProductManagement
          role={role}
          loggedInAdmin={loggedInAdmin}
          onProductCreate={handleProductCreate}
        />
      )}
      {activeTab === 3 && <AdminManagement />}
    </Box>
  );
};

export default SuperAdminDashboard;
