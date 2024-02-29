// components/Doctors/Doctors.js
import React from "react";

const Doctors = ({
  doctorId,
  imageSrc,
  doctorName,
  speciality,
  experience,
  email,
  phone,
  fees,
  onBookAppointment,
}) => {
  return (
    <div>
      <div>
        <img src={imageSrc} alt={`Dr. ${doctorName}`} />
      </div>
      <div>
        <h3>{doctorName}</h3>
        <p>{speciality}</p>
        <p>Experience: {experience} years</p>
        <p>Email: {email}</p>
        <p>Phone: {phone}</p>
        <p>Fees: {fees}</p>
        <button onClick={onBookAppointment}>Book Appointment</button>
      </div>
    </div>
  );
};

export default Doctors;
