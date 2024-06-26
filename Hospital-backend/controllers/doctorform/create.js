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
      email,
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
      !email ||
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

    let newDoctorForm = await models.doctorforms.create({
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
      fees,
      speciality,
      experience,
      qualification,
    });

    await models.users.update(
      { status: "Under review" },
      { where: { id: id } }
    );

    return res.status(200).json({
      hasError: false,
      data: newDoctorForm,
      message: "Doctor Form submitted successfully!",
    });
  } catch (error) {
    console.error("Error during submitting Doctor Form:", error);

    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(400).json({
        hasError: true,
        message: "This Doctor Form with same user already exists",
      });
    }

    return res
      .status(500)
      .json({ hasError: true, message: "Internal Server Error" });
  }
}

module.exports = create;
