// // components/Navbar/Navbar.js
// import React from "react";
// import { Link } from "react-router-dom";

// const Navbar = ({
//   loggedIn,
//   onLoggedIn,
//   onLogout,
//   onListedAppointment,
//   onAppointmentRequest,
//   onApplyDoctor,
//   onBookAppointment,
//   onLogin,
// }) => {
//   return (
//     <nav>
//       <div>
//         <img src="/hospital-logo.png" alt="Hospital Logo" />
//         <h1>Hospital Name</h1>
//       </div>
//       <ul>
//         <li>
//           <Link to="/">Home</Link>
//         </li>
//         <li>
//           <Link to="/about">About</Link>
//         </li>
//         <li>
//           <Link to="/services">Services</Link>
//         </li>
//         <li>
//           <Link to="/doctors">Doctors</Link>
//         </li>
//         <li>
//           <Link to="/contact">Contact</Link>
//         </li>
//         <li>
//           <Link to="/blog">Blog</Link>
//         </li>
//       </ul>
//       <div>
//         {loggedIn ? (
//           <>
//             <button onClick={onLogout}>Logout</button>
//             <button onClick={onListedAppointment}>Appointments</button>
//             <button onClick={onAppointmentRequest}>Request</button>
//             <button onClick={onApplyDoctor}>Apply for Doctor</button>
//           </>
//         ) : (
//           <>
//             <button onClick={onLogin}>Log in </button>
//           </>
//         )}
//         <button onClick={onBookAppointment}>Book an Appointment</button>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

// components/Navbar/Navbar.js
import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({
  UserDetail,
  onLogin,
  onLogout,
  onListedAppointment,
  onAppointmentRequest,
  onApplyDoctor,
  onBookAppointment,
}) => {
  return (
    <nav>
      <div>
        <img src="/hospital-logo.png" alt="Hospital Logo" />
        <h1>Hospital Name</h1>
      </div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/services">Services</Link>
        </li>
        <li>
          <Link to="/doctors">Doctors</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
        <li>
          <Link to="/blog">Blog</Link>
        </li>
      </ul>
      <div>
        {UserDetail?.[("email", "userName")] ? (
          <>
            <p>Welcome {UserDetail.userName}!</p>
            <button onClick={onLogout}>Logout</button>
            <button onClick={onListedAppointment}>Appointments</button>
            <button onClick={onAppointmentRequest}>Requests</button>
            <button onClick={onApplyDoctor}>Apply for Doctor</button>
          </>
        ) : (
          <>
            <button onClick={onLogin}>Log in</button>
          </>
        )}
        <button onClick={onBookAppointment}>Book an Appointment</button>
      </div>
    </nav>
  );
};

export default Navbar;
