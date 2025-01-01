import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const PurchaseHistoryModal = ({
  open,
  handleClose,
  product,
  toggleApprovalStatus,
}) => {
  const { name, company, createdBy, purchaseHistory, isApproved, id } =
    product || {};

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "buyer", headerName: "Buyer", width: 200 },
    { field: "date", headerName: "Date", width: 150 },
    { field: "amount", headerName: "Amount", width: 150 },
  ];

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="purchase-history-modal-title"
      aria-describedby="purchase-history-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "80%",
          maxWidth: 700,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography
          id="purchase-history-modal-title"
          variant="h6"
          component="h2"
          sx={{ mb: 2 }}
        >
          Product Details: {name}
        </Typography>

        <Box sx={{ mb: 2 }}>
          <Typography variant="body1">
            <strong>Company:</strong> {company}
          </Typography>
          <Typography variant="body1">
            <strong>Created By:</strong> {createdBy}
          </Typography>
          <Typography variant="body1">
            <strong>Approval Status:</strong>{" "}
            {isApproved ? "Approved" : "Not Approved"}
          </Typography>
        </Box>

        <Typography variant="h6" sx={{ mb: 2 }}>
          Purchase History
        </Typography>
        {purchaseHistory && purchaseHistory.length === 0 ? (
          <Typography>
            No purchase history available for this product.
          </Typography>
        ) : (
          <Box sx={{ height: 400, mb: 2 }}>
            <DataGrid
              rows={purchaseHistory || []}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              autoHeight={false}
              disableSelectionOnClick
              sx={{
                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: "#f5f5f5",
                  fontWeight: "bold",
                },
                "& .MuiDataGrid-row": {
                  cursor: "pointer",
                },
              }}
            />
          </Box>
        )}

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => toggleApprovalStatus(id, true)}
          >
            Approve
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => toggleApprovalStatus(id, false)}
          >
            Disapprove
          </Button>
        </Box>

        <Box sx={{ textAlign: "right", mt: 2 }}>
          <Button variant="contained" color="primary" onClick={handleClose}>
            Close
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default PurchaseHistoryModal;
