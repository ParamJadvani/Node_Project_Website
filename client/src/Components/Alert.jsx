import Swal from "sweetalert2";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaInfoCircle,
  FaSmile,
  FaExclamationTriangle,
} from "react-icons/fa";
import { renderToString } from "react-dom/server";

const Alert = ({
  type,
  message,
  title = undefined,
  confirmButtonText,
  cancelButtonText,
  showCancelButton,
  timer,
  customStyle,
  showConfirmButton,
  onConfirm = () => {},
  onCancel = () => {},
  isPending = false,
}) => {
  const getIconHtml = () => {
    switch (type.toLowerCase()) {
      case "success":
        return renderToString(
          <FaCheckCircle style={{ color: "#28a745", fontSize: "60px" }} />
        );
      case "error":
        return renderToString(
          <FaTimesCircle style={{ color: "#dc3545", fontSize: "60px" }} />
        );
      case "info":
        return renderToString(
          <FaInfoCircle style={{ color: "#17a2b8", fontSize: "60px" }} />
        );
      case "pending":
        return renderToString(
          <FaSmile style={{ color: "#007bff", fontSize: "60px" }} /> // Smile with blue color
        );
      case "warning":
        return renderToString(
          <FaExclamationTriangle
            style={{ color: "#ffc107", fontSize: "60px" }}
          />
        );
      default:
        return "";
    }
  };

  const showAlert = () => {
    const config = {
      html: `
        <div style="display: flex; flex-direction: column; align-items: center; gap: 16px; font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;">
          ${
            title || type
              ? `<h1 style="color: black; font-size: 30px; font-weight: bolder; text-transform: capitalize; text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.3); font-family:'Courier New', Courier, monospace;">
                  ${title || type}
                </h1>`
              : ""
          }
          <div>
            ${getIconHtml()}
          </div>
          <p style="color: black; font-size: 20px; font-weight: 700; text-align: center; line-height: 1.6; text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2); font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;">
            ${message}
          </p>
        </div>
      `,
      confirmButtonText: confirmButtonText || "OK",
      cancelButtonText,
      showCancelButton,
      customClass: customStyle,
      timer,
      showConfirmButton: isPending ? false : showConfirmButton,
      allowOutsideClick: !isPending,
      didOpen: isPending ? () => Swal.showLoading() : null,
    };

    Swal.fire(config);
  };

  showAlert();

  return null;
};

export default Alert;
