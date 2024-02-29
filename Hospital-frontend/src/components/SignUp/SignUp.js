// components/SignUp/SignUp.js

import React from "react";

const SignUp = ({
  userName,
  email,
  password,
  role,
  handleOnChange,
  handleSubmit,
}) => {
  return (
    <div>
      <h2>Signup Page</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="userName">User Name:</label>
          <input
            type="text"
            id="userName"
            value={userName}
            name="userName"
            onChange={handleOnChange}
          />
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            name="email"
            onChange={handleOnChange}
          />
        </div>

        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handleOnChange}
          />
        </div>

        <div>
          <label htmlFor="role">I am a:</label>
          <select value={role} onChange={handleOnChange} id="role" name="role">
            <option value="">Select Role</option>
            <option value="Patient">Patient</option>
            <option value="Doctor">Doctor</option>
          </select>
        </div>

        <div>
          <button type="submit">Sign up</button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
