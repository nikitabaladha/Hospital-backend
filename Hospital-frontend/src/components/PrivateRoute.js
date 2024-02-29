// components/PrivateRoute.js
// import React from "react";
// import { Route, Navigate } from "react-router-dom";
// import { isAuthenticated } from "../Utils/Api.js";

// const PrivateRoute = ({ element, ...rest }) => {
//   const isUserAuthenticated = isAuthenticated();

//   return isUserAuthenticated ? (
//     <Route {...rest} element={element} />
//   ) : (
//     <Navigate to="/sign-in" />
//   );
// };

// export default PrivateRoute;
