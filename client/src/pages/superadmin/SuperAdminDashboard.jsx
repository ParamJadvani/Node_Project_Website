import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Modal,
  TextField,
  Grid,
  Card,
  CardContent,
  CardActions,
  Divider,
  Tabs,
  Tab,
  IconButton,
} from "@mui/material";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import { styled } from "@mui/system";
import SearchIcon from "@mui/icons-material/Search";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import PeopleIcon from "@mui/icons-material/People";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const SuperAdminDashboard = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [admins, setAdmins] = useState([
    {
      id: 1,
      name: "Admin A",
      email: "adminA@example.com",
      isBlocked: false,
      createdProduct: "Product 1",
    },
    {
      id: 2,
      name: "Admin B",
      email: "adminB@example.com",
      isBlocked: true,
      createdProduct: "Product 2",
    },
  ]);
  const [users, setUsers] = useState([
    { id: 1, name: "User X", email: "userX@example.com", isBlocked: false },
    { id: 2, name: "User Y", email: "userY@example.com", isBlocked: true },
  ]);
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Product 1",
      company: "Company A",
      isApproved: false,
      createdBy: "Admin A",
    },
    {
      id: 2,
      name: "Product 2",
      company: "Company B",
      isApproved: true,
      createdBy: "Admin B",
    },
  ]);
  const [reviewModal, setReviewModal] = useState(false);
  const [reviewData, setReviewData] = useState(null);
  const [comments, setComments] = useState("");

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
    width: 400,
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const toggleBlockEntity = (id, type) => {
    if (type === "admin") {
      setAdmins((prev) =>
        prev.map((admin) =>
          admin.id === id ? { ...admin, isBlocked: !admin.isBlocked } : admin
        )
      );
    } else if (type === "user") {
      setUsers((prev) =>
        prev.map((user) =>
          user.id === id ? { ...user, isBlocked: !user.isBlocked } : user
        )
      );
    }
  };

  const approveProduct = (id) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === id ? { ...product, isApproved: true } : product
      )
    );
  };

  const openReviewModal = (data) => {
    setReviewData(data);
    setReviewModal(true);
  };

  const closeReviewModal = () => {
    setReviewModal(false);
    setReviewData(null);
    setComments("");
  };

  const saveComments = () => {
    console.log(`Saved comments for ${reviewData?.type} ID: ${reviewData?.id}`);
    console.log("Comments:", comments);
    closeReviewModal();
  };

  const columnsConfig = (type) => [
    { field: "id", headerName: "ID", width: 100 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "email", headerName: "Email", width: 250 },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      valueGetter: (params) => {
        const row = params?.row ?? {};
        if (type === "product") {
          return row.isApproved ? "Approved" : "Pending";
        } else {
          return row.isBlocked ? "Blocked" : "Active";
        }
      },
    },
    ...(type === "product"
      ? [{ field: "company", headerName: "Company", width: 200 }]
      : []),
    ...(type === "product"
      ? [{ field: "createdBy", headerName: "Created By", width: 200 }]
      : []),
    {
      field: "actions",
      headerName: "Actions",
      width: 300,
      renderCell: (params) => {
        const row = params?.row ?? {};
        return (
          <Box>
            {type !== "product" ? (
              <Button
                variant="contained"
                color={row.isBlocked ? "success" : "error"}
                size="small"
                onClick={() => toggleBlockEntity(row.id, type)}
              >
                {row.isBlocked ? "Unblock" : "Block"}
              </Button>
            ) : (
              !row.isApproved && (
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={() => approveProduct(row.id)}
                >
                  Approve
                </Button>
              )
            )}
            <Button
              variant="outlined"
              size="small"
              sx={{ ml: 1 }}
              onClick={() =>
                openReviewModal({
                  ...row,
                  type: type === "product" ? "Product" : type,
                })
              }
            >
              Review
            </Button>
          </Box>
        );
      },
    },
  ];

  const CustomToolbar = () => (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
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

      <Box sx={{ display: "flex", height: "100%", flexGrow: 1 }}>
        <Box sx={{ width: "100%", p: 3 }}>
          <Tabs value={activeTab} onChange={handleTabChange} centered>
            <Tab
              label="Admin Management"
              icon={<AdminPanelSettingsIcon />}
              iconPosition="start"
            />
            <Tab
              label="User Management"
              icon={<PeopleIcon />}
              iconPosition="start"
            />
            <Tab
              label="Product Management"
              icon={<ShoppingCartIcon />}
              iconPosition="start"
            />
          </Tabs>

          <Box sx={{ mt: 3 }}>
            {activeTab === 0 && (
              <Grid container spacing={3}>
                <Grid item xs={12} sx={{ height: 300 }}>
                  <Card
                    sx={{ width: "100%", bgcolor: "#e3f2fd", height: "100%" }}
                  >
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Admins Overview
                      </Typography>
                      <DataGrid
                        rows={admins}
                        columns={columnsConfig("admin")}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        autoHeight
                        disableSelectionOnClick
                        components={{ Toolbar: CustomToolbar }}
                        sx={{
                          bgcolor: "white",
                          borderRadius: 2,
                          border: "1px solid #ddd",
                          boxShadow: 2,
                        }}
                      />
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            )}

            {activeTab === 1 && (
              <Grid container spacing={3}>
                <Grid item xs={12} sx={{ height: 300 }}>
                  <Card
                    sx={{ width: "100%", bgcolor: "#c8e6c9", height: "100%" }}
                  >
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Users Overview
                      </Typography>
                      <DataGrid
                        rows={users}
                        columns={columnsConfig("user")}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        autoHeight
                        disableSelectionOnClick
                        components={{ Toolbar: CustomToolbar }}
                        sx={{
                          bgcolor: "white",
                          borderRadius: 2,
                          border: "1px solid #ddd",
                          boxShadow: 2,
                        }}
                      />
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            )}

            {activeTab === 2 && (
              <Grid container spacing={3}>
                <Grid item xs={12} sx={{ height: 300 }}>
                  <Card
                    sx={{ width: "100%", bgcolor: "#fff9c4", height: "100%" }}
                  >
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Product Management
                      </Typography>
                      <DataGrid
                        rows={products}
                        columns={columnsConfig("product")}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        autoHeight
                        disableSelectionOnClick
                        components={{ Toolbar: CustomToolbar }}
                        sx={{
                          bgcolor: "white",
                          borderRadius: 2,
                          border: "1px solid #ddd",
                          boxShadow: 2,
                        }}
                      />
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            )}
          </Box>
        </Box>

        <Modal
          open={reviewModal}
          onClose={closeReviewModal}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <Box sx={modalStyle}>
            <Typography
              id="modal-title"
              variant="h6"
              component="h2"
              gutterBottom
            >
              {reviewData?.type} Review
            </Typography>
            <Typography id="modal-description" variant="body2" sx={{ mb: 2 }}>
              Provide your comments below:
            </Typography>
            <TextField
              label="Comments"
              multiline
              rows={4}
              variant="outlined"
              fullWidth
              value={comments}
              onChange={(e) => setComments(e.target.value)}
            />
            <Box sx={{ mt: 2 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={saveComments}
                sx={{ mr: 2 }}
              >
                Save
              </Button>
              <Button variant="outlined" onClick={closeReviewModal}>
                Cancel
              </Button>
            </Box>
          </Box>
        </Modal>
      </Box>
    </Box>
  );
};

export default SuperAdminDashboard;
