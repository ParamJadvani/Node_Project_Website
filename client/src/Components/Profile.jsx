import React from "react";
import {
  Card,
  CardContent,
  Box,
  Typography,
  Avatar,
  Chip,
  Stack,
  Divider,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  ShoppingBag,
  AccessTime,
  CheckCircle,
  Person,
} from "@mui/icons-material";
import { useSelector } from "react-redux";
import Navbar from "./Navbar";

// Professional color scheme
const COLORS = {
  primary: "#2A3F54",
  secondary: "#5A6972",
  accent: "#1ABB9C",
  background: "#F5F7FA",
};

// Styled Profile Card
const ProfileCard = styled(Card)(({ theme }) => ({
  maxWidth: 800,
  margin: "0 auto",
  marginTop: theme.spacing(8),
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: theme.shadows[4],
  transition: "transform 0.3s",
  "&:hover": {
    transform: "translateY(-4px)",
  },
}));

// Styled Profile Avatar
const ProfileAvatar = styled(Avatar)(({ theme }) => ({
  width: 120,
  height: 120,
  border: `4px solid ${theme.palette.common.white}`,
  boxShadow: theme.shadows[4],
  backgroundColor: COLORS.accent,
  margin: "0 auto",
  marginBottom: theme.spacing(2),
}));

// Stats Card Component
const StatsCard = styled(Box)(({ theme }) => ({
  backgroundColor: COLORS.background,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(2),
  textAlign: "center",
  minWidth: 200,
  margin: theme.spacing(1),
}));

const RoleBadge = styled(Chip)(({ role }) => ({
  backgroundColor:
    role === "Admin"
      ? "#3498DB"
      : role === "SuperAdmin"
        ? "#9B59B6"
        : "#2ECC71",
  color: "#FFF",
  fontWeight: "bold",
  padding: "4px 12px",
  borderRadius: 20,
}));

const Profile = ({ ...stats }) => {
  const API_URL = import.meta.env.VITE_API_URL;
  let { user } = useSelector((state) => state.userReducer);
  const getRoleData = () => {
    switch (user.role.toLowerCase()) {
      case "admin":
        return {
          icon: <ShoppingBag sx={{ color: COLORS.primary, fontSize: 40 }} />,
          label: "Total Created Products",
          value: stats.totalCreatedProducts,
        };
      case "superadmin":
        return {
          icon: <AccessTime sx={{ color: COLORS.primary, fontSize: 40 }} />,
          label: "Pending Approvals",
          value: stats.pendingApprovalProducts,
        };
      default: // User
        return {
          icon: <CheckCircle sx={{ color: COLORS.primary, fontSize: 40 }} />,
          label: "Purchased Products",
          value: stats.purchasedProducts,
        };
    }
  };

  const roleData = getRoleData();

  return (
    <>
      <Navbar />
      <ProfileCard>
        <CardContent>
          {/* Profile Image Section */}
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <ProfileAvatar src={`${API_URL}/${user.profileImage}`}>
              {!user.profileImage && <Person fontSize="large" />}
            </ProfileAvatar>
          </Box>

          {/* User Information Section */}
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Typography variant="h4" fontWeight="600" color={COLORS.primary}>
              {user.username}
            </Typography>
            <Typography variant="subtitle1" color={COLORS.secondary}>
              {user.email}
            </Typography>
            <Box sx={{ mt: 1 }}>
              <RoleBadge label={user.role} role={user.role.toLowerCase()} />
            </Box>
          </Box>

          <Divider sx={{ width: "80%", mx: "auto", my: 3 }} />

          {/* Role-Specific Information Section */}
          <Stack direction="row" justifyContent="center" flexWrap="wrap">
            <StatsCard>
              {roleData.icon}
              <Typography variant="h4" color={COLORS.primary}>
                {roleData.value}
              </Typography>
              <Typography variant="body2" color={COLORS.secondary}>
                {roleData.label}
              </Typography>
            </StatsCard>

            {/* Additional Stats Card Example */}
            <StatsCard>
              <Typography variant="h6" color={COLORS.secondary}>
                Member Since
              </Typography>
              <Typography variant="h5" color={COLORS.primary}>
                2025
              </Typography>
            </StatsCard>
          </Stack>
        </CardContent>
      </ProfileCard>
    </>
  );
};

export default Profile;
