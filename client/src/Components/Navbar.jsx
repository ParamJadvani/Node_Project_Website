import { Link } from "react-router-dom";
import { FaHome, FaSignInAlt, FaUserPlus, FaBars } from "react-icons/fa";

const Navbar = () => {
  return (
    <div className="navbar bg-white shadow-md">
      {/* Logo */}
      <div className="flex-1">
        <Link to="/" className="text-2xl font-bold text-gray-800">
          MyApp
        </Link>
      </div>

      {/* Links for larger screens */}
      <div className="hidden lg:flex">
        <ul className="menu menu-horizontal px-1 space-x-4">
          <li>
            <Link
              to="/"
              className="flex items-center gap-2 text-gray-800 hover:text-gray-600"
            >
              <FaHome /> Home
            </Link>
          </li>
          <li>
            <Link
              to="/login"
              className="flex items-center gap-2 text-gray-800 hover:text-gray-600"
            >
              <FaSignInAlt /> Login
            </Link>
          </li>
          <li>
            <Link
              to="/signup/user"
              className="flex items-center gap-2 text-gray-800 hover:text-gray-600"
            >
              <FaUserPlus /> Signup
            </Link>
          </li>
        </ul>
      </div>

      {/* Dropdown for smaller screens */}
      <div className="dropdown dropdown-end lg:hidden">
        <label tabIndex={0} className="btn btn-ghost">
          <FaBars className="text-gray-800 h-5 w-5" />
        </label>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-white rounded-box w-52 text-gray-800"
        >
          <li>
            <Link to="/" className="flex items-center gap-2">
              <FaHome /> Home
            </Link>
          </li>
          <li>
            <Link to="/login" className="flex items-center gap-2">
              <FaSignInAlt /> Login
            </Link>
          </li>
          <li>
            <Link to="/signup/user" className="flex items-center gap-2">
              <FaUserPlus /> Signup
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
