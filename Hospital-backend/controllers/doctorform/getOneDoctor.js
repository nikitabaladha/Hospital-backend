// controllers/doctorForm/getOneDoctor.js

const models = require("../../models");

async function getOneDoctor(req, res) {
  try {
    const { doctorId } = req.params;

    const doctor = await models.doctorforms.findOne({
      where: { userId: doctorId },
      include: [
        {
          model: models.users,
          attributes: ["email", "status"],
          where: { status: "Approved" },
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
        "userId",
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
      id: doctor.userId,
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

module.exports = getOneDoctor;
