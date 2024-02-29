// containers/SignUp/SignUpContainer.js

import React, { useState } from "react";
import SignUp from "../../components/SignUp/SignUp.js";
import postAPI, { handleUnauthorized } from "../../Utils/Api.js"; // Import handleUnauthorized

import { useNavigate } from "react-router-dom";

const SignUpContainer = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    if (name === "userName") setUserName(value);
    else if (name === "email") setEmail(value);
    else if (name === "password") setPassword(value);
    else if (name === "role") setRole(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await postAPI("/signup", {
        userName,
        userType: role,
        email,
        password,
      });

      if (response.hasError === false) {
        console.log(response);
        alert(response.message);
        navigate("/sign-in");
      } else {
        console.log(response);
        alert(response.message);
      }
    } catch (error) {
      console.error("Internal server error during sign-up:", error);

      if (error.response && error.response.status === 401) {
        handleUnauthorized();
      } else {
        alert("Internal server error during sign-up");
      }
    }
  };

  return (
    <SignUp
      userName={userName}
      email={email}
      password={password}
      role={role}
      handleOnChange={handleOnChange}
      handleSubmit={handleSubmit}
    />
  );
};

export default SignUpContainer;
