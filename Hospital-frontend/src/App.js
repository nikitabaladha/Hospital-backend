// App.js

import React from "react";
import { Routes, Route } from "react-router-dom";
import HomeContainer from "./containers/Home/HomeContainer";
import SignInContainer from "./containers/SignIn/SignInContainer";
import SignUpContainer from "./containers/SignUp/SignUpContainer";
// import DoctorInfoContainer from "./containers/DoctorInfo/DoctorInfoContainer";
import DoctorFormContainer from "./containers/DoctorForm/DoctorFormContainer";
import RequestsContainer from "./containers/Requests/RequestsContainer";
import DoctorsContainer from "./containers/Doctors/DoctorsContainer";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeContainer />} />
      <Route path="/sign-in" element={<SignInContainer />} />
      <Route path="/sign-up" element={<SignUpContainer />} />
      {/* <Route path="/doctor-info" element={<DoctorInfoContainer />} /> */}
      <Route path="/doctor-form" element={<DoctorFormContainer />} />
      <Route path="/appointment-request" element={<RequestsContainer />} />
      <Route path="/doctors" element={<DoctorsContainer />} />
    </Routes>
  );
};

export default App;
