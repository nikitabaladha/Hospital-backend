// containers/Doctors/DoctorsContainer.js
import React from "react";
import Doctors from "../../components/Doctors/Doctors.js";
import { useNavigate } from "react-router-dom";

const DoctorContainer = () => {
  const navigate = useNavigate();

  const doctorsData = [
    {
      id: 1,
      imageSrc: "doctor1.jpg",
      doctorName: "John Doe",
      speciality: "Cardiologist",
      experience: 10,
      email: "john.doe@example.com",
      phone: "+1 123-456-7890",
      fees: "$150",
    },
    {
      id: 2,
      imageSrc: "doctor2.jpg",
      doctorName: "Jane Smith",
      speciality: "Dermatologist",
      experience: 8,
      email: "jane.smith@example.com",
      phone: "+1 234-567-8901",
      fees: "$120",
    },
  ];

  const handleOnClick = (doctorId) => {
    navigate(`/doctor-info/${doctorId}`);
  };

  return (
    <div>
      {doctorsData.map((doctor) => (
        <Doctors
          key={doctor.id}
          doctorId={doctor.id}
          imageSrc={doctor.imageSrc}
          doctorName={doctor.doctorName}
          speciality={doctor.speciality}
          experience={doctor.experience}
          email={doctor.email}
          phone={doctor.phone}
          fees={doctor.fees}
          onBookAppointment={() => handleOnClick(doctor.id)}
        />
      ))}
    </div>
  );
};

export default DoctorContainer;
