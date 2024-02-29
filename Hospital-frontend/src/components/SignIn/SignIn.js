// components/SignIn/SignIn.js
import React from "react";

const SignIn = ({ onSignUp, handleSignIn }) => {
  return (
    <div>
      <div>
        <h2>Want to be one of us?</h2>
        <button onClick={onSignUp}>Sign up</button>
      </div>
      <div>
        <h2>Sign in</h2>
        <form onSubmit={handleSignIn}>
          <label>
            Email:
            <input type="email" name="email" />
          </label>
          <br />
          <label>
            Password:
            <input type="password" name="password" />
          </label>
          <br />
          <button type="submit">Sign in</button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
