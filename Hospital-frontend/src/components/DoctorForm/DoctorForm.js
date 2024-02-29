// components/DoctorForm/DoctorForm.js
import React from "react";

const DoctorForm = ({
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
  onSubmit,
  handleOnChange,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          value={firstName}
          onChange={handleOnChange}
          name="firstName"
          required
        />
      </div>
      <div>
        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          value={lastName}
          onChange={handleOnChange}
          name="lastName"
          required
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          value={email}
          onChange={handleOnChange}
          name="email"
          required
        />
      </div>
      <div>
        <label htmlFor="mobileNumber">Mobile Number:</label>
        <input
          type="tel"
          value={mobileNumber}
          onChange={handleOnChange}
          name="mobileNumber"
          pattern="[0-9]{10}"
          required
        />
      </div>
      <div>
        <label htmlFor="dob">Date of Birth:</label>
        <input
          type="date"
          value={dob}
          onChange={handleOnChange}
          name="dob"
          required
        />
      </div>
      <div>
        <label htmlFor="addressData1">Address data 1:</label>
        <input
          type="text"
          value={addressData1}
          onChange={handleOnChange}
          name="addressData1"
          required
        />
      </div>
      <div>
        <label htmlFor="addressData2">Address data 2:</label>
        <input
          type="text"
          value={addressData2}
          onChange={handleOnChange}
          name="addressData2"
        />
      </div>
      <div>
        <label htmlFor="city">City:</label>
        <input
          type="text"
          value={city}
          onChange={handleOnChange}
          name="city"
          required
        />
      </div>
      <div>
        <label htmlFor="state">State:</label>
        <input
          type="text"
          value={state}
          onChange={handleOnChange}
          name="state"
          required
        />
      </div>
      <div>
        <label htmlFor="country">Country:</label>
        <input
          type="text"
          value={country}
          onChange={handleOnChange}
          name="country"
          required
        />
      </div>
      <div>
        <label htmlFor="zipCode">Zip Code:</label>
        <input
          type="text"
          value={zipCode}
          onChange={handleOnChange}
          name="zipCode"
          required
        />
      </div>
      <div>
        <label htmlFor="speciality">Speciality:</label>
        <select
          value={speciality}
          onChange={handleOnChange}
          name="speciality"
          required
        >
          <option value="" disabled defaultValue>
            Select Speciality
          </option>
          <option value="Cardiologist">Cardiologist</option>
          <option value="Dentist">Dentist</option>
          <option value="Orthopedics">Orthopedics</option>
          <option value="Gynecologist">Gynecologist</option>
        </select>
      </div>
      <div>
        <label htmlFor="qualification">Qualification:</label>
        <select
          value={qualification}
          onChange={handleOnChange}
          name="qualification"
          required
        >
          <option value="" disabled defaultValue>
            Select Qualification
          </option>
          <option value="MBBS">MBBS</option>
          <option value="MS">MS</option>
          <option value="MD">MD</option>
          <option value="BAMS">BAMS</option>
          <option value="BHMS">BHMS</option>
          <option value="BPT">BPT</option>
          <option value="B.Vsc">B.Vsc</option>
          <option value="BUMS">BUMS</option>
          <option value="BSMS">BSMS</option>
          <option value="BNYS">BNYS</option>
        </select>
      </div>

      <div>
        <label htmlFor="experience">Years of Experience:</label>
        <input
          type="number"
          value={experience}
          onChange={handleOnChange}
          name="experience"
          min="0"
          placeholder="Enter years of experience"
          required
        />
      </div>
      <button type="submit">Submit Form</button>
    </form>
  );
};

export default DoctorForm;
