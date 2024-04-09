import React, { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { Link, useNavigate } from "react-router-dom";

const Logout = ({ handleDropdownBlur }) => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.handleLogout();
    navigate("/", { state: { message: " You have been logged out!" } });
  };

  return (
    <>
      <li>
        <Link
          className="dropdown-item"
          to={"/profile"}
          onClick={handleDropdownBlur}
        >
          Profile
        </Link>
      </li>
      <li>
        <hr className="dropdown-divider" />
      </li>
      <div onClick={handleDropdownBlur}>
        <button className="dropdown-item" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </>
  );
};

export default Logout;
