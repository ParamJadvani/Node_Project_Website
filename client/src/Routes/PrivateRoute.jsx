import { useDispatch, useSelector } from "react-redux";
import Alert from "../components/Alert";
import { useNavigate, useLocation } from "react-router-dom";
import { logout } from "../redux/slice/auth/AuthApi";
import { useEffect } from "react";

const PrivateRoute = ({ allowedRoles, children }) => {
  const { user, isLogin, isActive } = useSelector((store) => store.userReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isLogin) {
      Alert({
        type: "warning",
        title: "Information",
        message:
          "You must be logged in to access this page. Please log in to continue.",
        confirmButtonText: "OK",
        showConfirmButton: true,
      });
      navigate("/login", { state: { from: location.pathname } }); // Redirect with state
    } else if (!isActive) {
      Alert({
        type: "warning",
        title: "Account Blocked",
        message:
          "Your account has been blocked. Please contact support for further assistance.",
        confirmButtonText: "OK",
        showConfirmButton: true,
      });
      dispatch(logout());
      navigate("/signup/user", { state: { from: location.pathname } }); // Redirect with state
    } else if (!allowedRoles.includes(user.role)) {
      Alert({
        type: "error",
        title: "Access Denied",
        message: "Access Denied! You do not have permission to view this page.",
        confirmButtonText: "OK",
        showConfirmButton: true,
      });
      navigate("/", { state: { from: location.pathname } }); // Redirect with state
    }
  }, [isLogin, isActive, user, allowedRoles, navigate, dispatch, location]);

  // Render children only when all checks pass
  if (isLogin && isActive && allowedRoles.includes(user.role)) {
    return children;
  }

  return null; // Prevent rendering if checks fail
};

export default PrivateRoute;
