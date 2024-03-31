// controllers/doctorform/update.js

const models = require("../../models");

async function update(req, res) {
  try {
    const { userId: id, userType } = req.user;

    if (userType !== "Doctor") {
      return res.status(400).json({
        message: "Only doctors can update doctor forms.",
        hasError: true,
      });
    }

    const {
      doctorFormId,
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

    const doctorForm = await models.doctorforms.findOne({
      where: { id: doctorFormId, userId: id },
    });

    if (!doctorForm) {
      return res.status(404).json({
        message: "Doctor form not found or you are not authorized to update.",
        hasError: true,
      });
    }

    await models.doctorforms.update(
      {
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
      },
      { where: { id: doctorFormId } }
    );

    const updatedDoctorForm = await models.doctorforms.findByPk(doctorFormId);

    return res.status(200).json({
      hasError: false,
      data: updatedDoctorForm,
      message: "Doctor form updated successfully!",
    });
  } catch (error) {
    console.error("Error during updating form:", error);

    return res
      .status(500)
      .json({ hasError: true, message: "Internal Server Error" });
  }
}

module.exports = update;
