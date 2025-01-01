import React, { useState } from "react";
import {
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
  Box,
} from "@mui/material";
import PurchaseHistoryModal from "./PurchaseHistoryModel";

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

  const handleProductDelete = (productId) => {
    const updatedProducts = products.filter(
      (product) => product.id !== productId
    );
    setProducts(updatedProducts);
  };

  return (
    <div>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Product Management
      </Typography>

      {role === "Admin" && (
        <Box sx={{ mb: 3 }}>
          <Button variant="contained" color="primary" onClick={onProductCreate}>
            Create New Product
          </Button>
        </Box>
      )}

      <List>
        {filteredProducts.map((product) => (
          <ListItem
            button
            key={product.id}
            onClick={() => openPurchaseHistoryModal(product)}
          >
            <ListItemText
              primary={product.name}
              secondary={`Company: ${product.company} - ${
                product.isApproved ? "Approved" : "Not Approved"
              }`}
            />
            {role === "Admin" && product.createdBy === loggedInAdmin && (
              <Button
                variant="contained"
                color="error"
                onClick={(e) => {
                  e.stopPropagation();
                  handleProductDelete(product.id);
                }}
              >
                Delete
              </Button>
            )}
          </ListItem>
        ))}
      </List>

      {selectedProduct && (
        <PurchaseHistoryModal
          open={purchaseHistoryModal}
          handleClose={closePurchaseHistoryModal}
          product={selectedProduct}
          toggleApprovalStatus={toggleApprovalStatus}
        />
      )}
    </div>
  );
};

export default ProductManagement;
