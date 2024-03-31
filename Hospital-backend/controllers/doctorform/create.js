// controllers/doctorform/create.js

const models = require("../../models");

async function create(req, res) {
  try {
    const { userId: id, userType } = req.user;

    if (userType !== "Doctor") {
      return res.status(400).json({
        message: "Only doctors can submit doctor forms.",
        hasError: true,
      });
    }

    const {
      firstName,
      lastName,
      mobileNumber,
      dob,
      address,
      city,
      state,
      country,
      zipCode,
      fees,
      speciality,
      experience,
      qualification,
    } = req.body;

    if (
      !firstName ||
      !lastName ||
      !mobileNumber ||
      !dob ||
      !address ||
      !city ||
      !state ||
      !country ||
      !zipCode ||
      !fees ||
      !speciality ||
      !experience ||
      !qualification
    ) {
      return res.status(400).json({
        message: "All fields are required.",
        hasError: true,
      });
    }

    let newDoctorform = await models.doctorforms.create({
      userId: id,
      firstName,
      lastName,
      mobileNumber,
      dob,
      address,
      city,
      state,
      country,
      zipCode,
      fees,
      speciality,
      experience,
      qualification,
    });

    return res.status(200).json({
      hasError: false,
      data: newDoctorform,
      message: "Form submitted successfully!",
    });
  } catch (error) {
    console.error("Error during submitting form:", error);

    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(400).json({
        hasError: true,
        message: "A Doctor form with for same user already exists",
      });
    }

    return res
      .status(500)
      .json({ hasError: true, message: "Internal Server Error" });
  }
}

module.exports = create;
