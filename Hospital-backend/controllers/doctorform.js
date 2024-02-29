// controllers/doctorform.js
const models = require("../models");

async function doctorform(req, res) {
  try {
    debugger;
    const { id, userType } = req.user;

    if (!req.user) {
      return res
        .status(401)
        .json({ error: "User not authenticated", hasError: true });
    }

    if (userType.toUpperCase() !== "DOCTOR") {
      return res.status(403).json({
        error: "Unauthorized. Only doctors can submit doctor forms.",
        hasError: true,
      });
    }

    const {
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
    } = req.body;

    const doctorFormData = await models.doctorforms.create({
      userId: id,
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
    });

    return res.status(201).json({
      doctorFormData,
      hasError: false,
    });
  } catch (error) {
    console.error("Error during submitting form:", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", hasError: true });
  }
}

module.exports = doctorform;
