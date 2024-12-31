import Swal from "sweetalert2";
import {
  FaCheckCircle,
  FaExclamationCircle,
  FaInfoCircle,
  FaHourglassStart,
} from "react-icons/fa";
import { renderToString } from "react-dom/server";

const Alert = ({
  type,
  message,
  title,
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
    switch (type) {
      case "success":
        return renderToString(
          <FaCheckCircle style={{ color: "green", fontSize: "48px" }} />
        );
      case "error":
        return renderToString(
          <FaExclamationCircle style={{ color: "red", fontSize: "48px" }} />
        );
      case "info":
        return renderToString(
          <FaInfoCircle style={{ color: "blue", fontSize: "48px" }} />
        );
      case "pending":
        return renderToString(
          <FaHourglassStart style={{ color: "gray", fontSize: "48px" }} />
        );
      default:
        return "";
    }
  };

  const showAlert = () => {
    const config = {
      title: title || type.charAt(0).toUpperCase() + type.slice(1),
      html: `
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
          ${getIconHtml()}
          <p>${message || ""}</p>
        </div>
      `,
      confirmButtonText,
      cancelButtonText,
      showCancelButton,
      customClass: customStyle,
      timer,
      showConfirmButton: isPending ? false : showConfirmButton, // Hide confirm button for pending
      allowOutsideClick: !isPending, // Prevent closing on click if pending
      didOpen: isPending ? () => Swal.showLoading() : null, // Attach loading if pending
      preConfirm: onConfirm,
      preCancel: onCancel,
    };

    Swal.fire(config);
  };

  showAlert();

  return null; // SweetAlert2 is called directly, so no visual component is needed
};

export default Alert;
