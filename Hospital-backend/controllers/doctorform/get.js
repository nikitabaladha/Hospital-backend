// controllers/doctor/get.js

const models = require("../../models");

async function get(req, res) {
  try {
    const { userId: id } = req.user;

    const doctor = await models.doctorforms.findOne({
      where: { userId: id },
      include: [
        {
          model: models.users,
          attributes: ["email"],
          required: true,
        },
      ],
      attributes: [
        "firstName",
        "lastName",
        "mobileNumber",
        "fees",
        "speciality",
        "experience",
        "qualification",
      ],
    });

    if (!doctor) {
      return res.status(404).json({
        message: "Doctor not found.",
        hasError: true,
      });
    }

    const formattedDoctor = {
      firstName: doctor.firstName,
      lastName: doctor.lastName,
      mobileNumber: doctor.mobileNumber,
      email: doctor.user.email,
      fees: doctor.fees,
      speciality: doctor.speciality,
      experience: doctor.experience,
      qualification: doctor.qualification,
    };

    return res.status(200).json({
      hasError: false,
      data: formattedDoctor,
      message: "Doctor details retrieved successfully!",
    });
  } catch (error) {
    console.error("Error fetching doctor details:", error);

    return res
      .status(500)
      .json({ hasError: true, message: "Internal Server Error" });
  }
}

module.exports = get;
