// controllers/doctorform.js
const models = require("../models");

async function doctorform(req, res) {
  try {
    const { id, userType } = req.user;

    if (userType !== "Doctor") {
      return res.status(400).json({
        message: "Unauthorized. Only doctors can submit doctor forms.",
        hasError: true,
      });
    }

    const {
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
    } = req.body;

    await models.doctorforms.create({
      userId: id,
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
    });

    // Return a successful response with the created data
    return res.status(200).json({
      hasError: false,
      success: true,
      message: "Form submitted successfully!",
    });
  } catch (error) {
    // Log the error for debugging
    console.error("Error during submitting form:", error);

    // Return an internal server error response
    return res
      .status(500)
      .json({ message: "Internal Server Error", hasError: true });
  }
}

module.exports = doctorform;
