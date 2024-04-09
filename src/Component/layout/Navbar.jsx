import React, { useState } from "react";
import { NavLink } from "react-bootstrap";
import { Link } from "react-router-dom";
import Logout from "../auth/Logout";

const Navbar = () => {
  // const [showAccount, setShowAccount] = useState(false);
  // const handleAccountClick = () => {
  //   setShowAccount(!showAccount);
  // };

  // const handleDropdownBlur = () => {
  //   setShowAccount(false);
  // };
  // return (
  //   <nav className="navbar navbar-expand-lg bg-body-tertiary px-5 shadow mt-2 sticky-top">
  //     <div className="container-fluid">
  //       <Link to={"/"} className="navbar-brand">
  //         <span className="hotel-color">Hotel Booking App</span>
  //       </Link>
  //       <button
  //         className="navbar-toggler"
  //         type="button"
  //         data-bs-toggle="collapse"
  //         data-bs-target="#navbarScroll"
  //         aria-controls="navbarScroll"
  //         aria-expanded="false"
  //         aria-label="Toggle navigation"
  //       >
  //         <span className="navbar-toggler-icon"></span>
  //       </button>
  //       <div className="collapse navbar-collapse" id="navbarScroll">
  //         <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
  //           <li className="nav-item">
  //             <Link
  //               to={"/browse-all-rooms"}
  //               className="nav-link"
  //               aria-current="page"
  //             >
  //               Browse all rooms
  //             </Link>
  //           </li>
  //           <li className="nav-item">
  //             <Link className="nav-link" aria-current="page" to={"/admin"}>
  //               Admin
  //             </Link>
  //           </li>
  //         </ul>

  //         <ul className="d-flex navbar-nav">
  //           <li className="nav-item">
  //             <Link className="nav-link" to={"/find-booking"}>
  //               Find My Booking
  //             </Link>
  //           </li>
  //           <li className="nav-item dropdown">
  //             <a
  //               className={`nav-link dropdown-toggle ${
  //                 showAccount ? "show" : ""
  //               }`}
  //               href="#"
  //               role="button"
  //               data-bs-toggle="dropdown"
  //               aria-expanded="false"
  //               onClick={handleAccountClick}
  //             >
  //               {" "}
  //               Account
  //             </a>

  //             <ul
  //               className={`dropdown-menu ${showAccount ? "show" : ""}`}
  //               aria-labelledby="navbarDropdown"
  //             >
  //               <li>
  //                 <Link
  //                   to={"/login"}
  //                   className="dropdown-item"
  //                   onClick={handleDropdownBlur}
  //                 >
  //                   Login
  //                 </Link>
  //               </li>

  //               <li>
  //                 <hr className="dropdown-divider" />
  //               </li>

  //               <li>
  //                 <Link
  //                   to={"/profile"}
  //                   className="dropdown-item"
  //                   onClick={handleDropdownBlur}
  //                 >
  //                   Profile
  //                 </Link>
  //               </li>

  //               <li>
  //                 <hr className="dropdown-divider" />
  //               </li>

  //               <li>
  //                 <Link
  //                   to={"/logout"}
  //                   className="dropdown-item"
  //                   onClick={handleDropdownBlur}
  //                 >
  //                   Logout
  //                 </Link>
  //               </li>
  //             </ul>
  //           </li>
  //         </ul>
  //       </div>
  //     </div>
  //   </nav>
  // );

  const [showAccount, setShowAccount] = useState(false);

  const handleAccountClick = () => {
    setShowAccount(!showAccount);
  };

  const handleDropdownBlur = () => {
    setShowAccount(false);
  };

  const isLoggedIn = localStorage.getItem("token");
  const userRole = localStorage.getItem("userRole");

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary px-5 shadow mt-2 sticky-top">
      <div className="container-fluid">
        <Link to={"/"} className="navbar-brand">
          <span className="hotel-color">Hotel Booking App</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarScroll"
          aria-controls="navbarScroll"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarScroll">
          <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
            <li className="nav-item">
              <Link
                to={"/browse-all-rooms"}
                className="nav-link"
                aria-current="page"
              >
                Browse all rooms
              </Link>
            </li>

            {isLoggedIn && userRole === "ROLE_ADMIN" && (
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to={"/admin"}>
                  Admin
                </Link>
              </li>
            )}
          </ul>

          <ul className="d-flex navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to={"/find-booking"}>
                Find my booking
              </Link>
            </li>

            <li className="nav-item dropdown">
              <a
                className={`nav-link dropdown-toggle ${
                  showAccount ? "show" : ""
                }`}
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                onClick={handleAccountClick}
              >
                {" "}
                Account
              </a>

              <ul
                className={`dropdown-menu ${showAccount ? "show" : ""}`}
                aria-labelledby="navbarDropdown"
              >
                {isLoggedIn ? (
                  <Logout handleDropdownBlur={handleDropdownBlur}/>
                ) : (
                  <li>
                    <Link className="dropdown-item" onClick={handleDropdownBlur} to={"/login"}>
                      Login
                    </Link>
                  </li>
                )}
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
