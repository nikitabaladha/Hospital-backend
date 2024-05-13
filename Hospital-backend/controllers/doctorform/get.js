// controllers/doctorForm/get.js

const models = require("../../models");

async function get(req, res) {
  try {
    const doctors = await models.doctorforms.findAll({
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

    if (!doctors.length) {
      return res.status(404).json({
        message: "Doctors not found.",
        hasError: true,
      });
    }

    const formattedDoctors = doctors.map((doc) => ({
      firstName: doc.firstName,
      lastName: doc.lastName,
      mobileNumber: doc.mobileNumber,
      email: doc.user.email,
      fees: doc.fees,
      speciality: doc.speciality,
      experience: doc.experience,
      qualification: doc.qualification,
      id: doc.userId,
    }));

    return res.status(200).json({
      hasError: false,
      data: formattedDoctors,
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
