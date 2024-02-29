// import React, { useState } from "react";
// import DoctorForm from "../../components/DoctorForm/DoctorForm.js";
// import { useNavigate } from "react-router-dom";

// const DoctorFormContainer = () => {
//   const navigate = useNavigate(); // Define the navigate constant

//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [email, setEmail] = useState("");
//   const [mobileNumber, setMobileNumber] = useState("");
//   const [dob, setDob] = useState("");
//   const [address1, setAddress1] = useState("");
//   const [address2, setAddress2] = useState("");
//   const [city, setCity] = useState("");
//   const [state, setState] = useState("");
//   const [zipCode, setZipCode] = useState("");
//   const [speciality, setSpecialty] = useState("");
//   const [experience, setExperience] = useState("");
//   const [qualification, setQualification] = useState("");

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;

//     if (name === "firstName") setFirstName(value);
//     else if (name === "lastName") setLastName(value);
//     else if (name === "email") setEmail(value);
//     else if (name === "mobileNumber") setMobileNumber(value);
//     else if (name === "dob") setDob(value);
//     else if (name === "address1") setAddress1(value);
//     else if (name === "address2") setAddress2(value);
//     else if (name === "city") setCity(value);
//     else if (name === "state") setState(value);
//     else if (name === "zipCode") setZipCode(value);
//     else if (name === "speciality") setSpecialty(value);
//     else if (name === "experience") setExperience(value);
//     else if (name === "qualification") setQualification(value);
//   };

//   const handleFormSubmit = (e) => {
//     e.preventDefault();

//     const formData = {
//       firstName,
//       lastName,
//       email,
//       mobileNumber,
//       dob,
//       address1,
//       address2,
//       city,
//       state,
//       zipCode,
//       speciality,
//       experience,
//       qualification,
//     };

//     console.log("Form submitted with data:", formData);

//     navigate("/");
//   };

//   return (
//     <div>
//       <h2>Doctor Registration Form</h2>
//       <DoctorForm
//         firstName={firstName}
//         lastName={lastName}
//         email={email}
//         mobileNumber={mobileNumber}
//         dob={dob}
//         address1={address1}
//         address2={address2}
//         city={city}
//         state={state}
//         zipCode={zipCode}
//         speciality={speciality}
//         experience={experience}
//         qualification={qualification}
//         handleOnChange={handleInputChange}
//         onSubmit={handleFormSubmit}
//       />
//     </div>
//   );
// };

// export default DoctorFormContainer;

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
  const [addressData1, setAddressData1] = useState("");
  const [addressData2, setAddressData2] = useState("");
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
    else if (name === "addressData1") setAddressData1(value);
    else if (name === "addressData2") setAddressData2(value);
    else if (name === "city") setCity(value);
    else if (name === "state") setState(value);
    else if (name === "country") setCountry(value);
    else if (name === "zipCode") setZipCode(value);
    else if (name === "speciality") setSpecialty(value);
    else if (name === "experience") setExperience(value);
    else if (name === "qualification") setQualification(value);
  };

  const handleFormSubmit = async (e) => {
    debugger;
    e.preventDefault();

    const formData = {
      firstName,
      lastName,
      email,
      mobileNumber,
      dob,
      addressData1,
      addressData2,
      city,
      state,
      country,
      zipCode,
      speciality,
      experience,
      qualification,
    };

    try {
      const response = await postAPI("/doctorform", formData);
      debugger;
      if (response.hasError === false) {
        console.log("Form submitted successfully!");
        navigate("/");
      } else {
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
        addressData1={addressData1}
        addressData2={addressData2}
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
