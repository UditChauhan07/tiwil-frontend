import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

import "./nav.css";
import { NavLink } from "react-router-dom";
function Navbar() {
  const navigate = useNavigate();
  const handleDashboardNavigation = () => {
    navigate("/dashboard");
  };

  const handlelogout = () =>{
    localStorage.removeItem('AccessToken');
    navigate('/')
    toast.success("Logout Successfully");
  }


  return (
    <>
      <aside
        className="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3 bg-gradient-dark"
        id="sidenav-main"
      >
        <div className="sidenav-header">
          <i
            className="fas fa-times p-3 cursor-pointer text-white opacity-5 position-absolute end-0 top-0 d-none d-xl-none"
            aria-hidden="true"
            id="iconSidenav"
          ></i>
          <img
            className="logo-img"
            // src="../../assets/img/TiwilLOGO 1.jpg"
            src="../../assets/img/Tiwi-log.png"
            alt=""
          />
        </div>

        <hr className="horizontal light mt-0 mb-2" />

        <div
          className="collapse navbar-collapse w-auto"
          id="sidenav-collapse-main"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <a
                className="nav-link text-white"
                onClick={handleDashboardNavigation}
              >
                <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                  <i className="material-icons opacity-10">dashboard</i>
                </div>
                <span className="nav-link-text ms-1">Dashboard</span>
              </a>
            </li>

            <li className="nav-item">
              <NavLink to="/user-list" className="nav-link text-white">
                <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                  <i className="material-icons opacity-10">table_view</i>
                </div>
                <span className="nav-link-text ms-1">User List</span>
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/event-list" className="nav-link text-white">
                <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                  <i className="material-icons opacity-10">receipt_long</i>
                </div>
                <span className="nav-link-text ms-1">Event List</span>
              </NavLink>
            </li>

            <li className="nav-item">
            <NavLink to="/notifications" className="nav-link text-white">
                <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                  <i className="material-icons opacity-10">view_in_ar</i>
                </div>
                <span className="nav-link-text ms-1">Notifications</span>
                </NavLink>
            </li>
            <li className="nav-item">
            <NavLink to="/subscription" className="nav-link text-white">
                <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                  <i className="material-icons opacity-10">login</i>
                </div>
                <span className="nav-link-text ms-1">Subscription</span>
                </NavLink>
            </li>

            <li className="nav-item">
            <NavLink to="/payments" className="nav-link text-white">
                <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                  <i className="material-icons opacity-10">table_view</i>
                </div>
                <span className="nav-link-text ms-1">Payments</span>
              </NavLink>
            </li>

            <li className="nav-item" onClick={handlelogout}>
              <a className="nav-link text-white">
                <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                  <i className="material-icons opacity-10">login</i>
                </div>
                <span className="nav-link-text ms-1">Logout</span>
              </a>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
}

export default Navbar;
