// containers/SignIn/SignInContainer.js

import React from "react";
import SignIn from "../../components/SignIn/SignIn.js";
import { useNavigate } from "react-router-dom";
import postAPI from "../../Utils/Api.js";

const SignInContainer = () => {
  const navigate = useNavigate();

  const handleSignInSuccess = () => navigate("/");

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      const { email, password } = e.target;
      const response = await postAPI("/login", {
        email: email.value,
        password: password.value,
      });

      // console.log("response : ", response);
      if (response.hasError === false) {
        localStorage.setItem("userDetail", JSON.stringify(response.data));
        handleSignInSuccess();
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.error("Error during sign-in:", error);
      alert("Internal server error during sign-in");
      console.log(error.response);
    }
  };

  const handleSignUp = () => {
    navigate("/sign-up");
  };

  return <SignIn onSignUp={handleSignUp} handleSignIn={handleSignIn} />;
};

export default SignInContainer;
