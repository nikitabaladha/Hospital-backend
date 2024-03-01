// container/DoctorForm/DoctorFormContainer.js

import React, { useState } from "react";
import DoctorForm from "../../components/DoctorForm/DoctorForm.js";
import postAPI from "../../Utils/Api.js";
import { useNavigate } from "react-router-dom";

const DoctorFormContainer = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [speciality, setSpecialty] = useState("");
  const [experience, setExperience] = useState("");
  const [qualification, setQualification] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "firstName") setFirstName(value);
    else if (name === "lastName") setLastName(value);
    else if (name === "email") setEmail(value);
    else if (name === "mobileNumber") setMobileNumber(value);
    else if (name === "dob") setDob(value);
    else if (name === "address") setAddress(value);
    else if (name === "city") setCity(value);
    else if (name === "state") setState(value);
    else if (name === "country") setCountry(value);
    else if (name === "zipCode") setZipCode(value);
    else if (name === "speciality") setSpecialty(value);
    else if (name === "experience") setExperience(value);
    else if (name === "qualification") setQualification(value);
  };

  const handleFormSubmit = async (e) => {
    const userDetail = JSON.parse(localStorage.getItem("userDetail"));

    e.preventDefault();

    try {
      const response = await postAPI(
        "/doctorform",
        {
          firstName,
          lastName,
          email,
          mobileNumber,
          dob,
          address,
          city,
          state,
          country,
          zipCode,
          speciality,
          experience,
          qualification,
        },
        { access_token: userDetail.accessToken }
      );

      if (response.hasError === false) {
        console.log("Form submitted successfully!");
        alert(response.message);
        navigate("/");
      } else {
        alert(response.message);
        console.error("Error submitting form:", response.statusText);
      }
    } catch (error) {
      console.error("Error during form submission:", error.message);
    }
  };

  return (
    <div>
      <h2>Doctor Registration Form</h2>
      <DoctorForm
        firstName={firstName}
        lastName={lastName}
        email={email}
        mobileNumber={mobileNumber}
        dob={dob}
        address={address}
        city={city}
        state={state}
        zipCode={zipCode}
        speciality={speciality}
        experience={experience}
        qualification={qualification}
        handleOnChange={handleInputChange}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
};

export default DoctorFormContainer;
