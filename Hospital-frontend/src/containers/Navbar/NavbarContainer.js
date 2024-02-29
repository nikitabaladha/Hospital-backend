// containers/Navbar/NavbarContainer.js

import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";

const NavbarContainer = () => {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const UserDetail = JSON.parse(localStorage.getItem("userDetail"));
  console.log(UserDetail);

  const handleLogout = () => {
    localStorage.removeItem("userDetail");
    setIsLoggedIn(false);
    console.log("Logout successful");
    navigate("/");
  };

  const handleListedAppointment = () => {
    console.log("Listed Appointments logic here");
  };

  const handleAppointmentRequest = () => {
    console.log("Appointment Request logic here");
  };

  const handleApplyDoctor = () => {
    console.log("Apply Doctor logic here");
  };

  const handleBookAppointment = () => {
    console.log("Book Appointment logic here");
  };
  const handleLogin = () => {
    navigate("/sign-in");
  };

  return (
    <Navbar
      UserDetail={UserDetail}
      onLogin={handleLogin}
      onLogout={handleLogout}
      onListedAppointment={handleListedAppointment}
      onAppointmentRequest={handleAppointmentRequest}
      onApplyDoctor={handleApplyDoctor}
      onBookAppointment={handleBookAppointment}
    />
  );
};

export default NavbarContainer;
