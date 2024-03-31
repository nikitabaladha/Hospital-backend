// controllers/appointment/get.js

const models = require("../../models");

async function get(req, res) {
  try {
    const { userId, userType } = req.user;

    let appointments;
    let queryCondition;

    if (userType === "Patient") {
      queryCondition = { patientId: userId };
    } else if (userType === "Doctor") {
      queryCondition = { doctorId: userId };
    } else {
      return res.status(403).json({
        hasError: true,
        message:
          "Permission denied. Only Patients or Doctors can access appointments.",
      });
    }

    appointments = await models.appointments.findAll({
      where: queryCondition,
      include: [
        { model: models.users, as: "doctor", attributes: ["userName"] },
        { model: models.users, as: "patient", attributes: ["userName"] },
      ],
      attributes: ["id", "disease", "startTime", "endTime", "fees", "status"],
    });

    const formattedAppointments = appointments.map((appointment) => {
      return {
        id: appointment.id,
        doctorName: appointment.doctor.userName,
        patientName: appointment.patient.userName,
        disease: appointment.disease,
        startTime: appointment.startTime,
        endTime: appointment.endTime,
        fees: appointment.fees,
        status: appointment.status,
      };
    });
    res.status(200).json({
      hasError: false,
      message: "Appointment data retrieved successfully",
      data: formattedAppointments,
    });
  } catch (error) {
    console.error("Error fetching appointments:", error);

    res.status(500).json({ hasError: true, message: "Internal Server Error" });
  }
}

module.exports = get;
