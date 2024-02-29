const models = require("../models");

async function getAppointment(req, res) {
  try {
    const { id, userType } = req.user;

    if (userType === "Doctor") {
      const allAppointments = await models.appointments.findAll({
        where: { doctorId: id },
        include: {
          model: models.users,
          as: "patient",
          attributes: ["userName"],
        },
      });

      const doctorAppointments = allAppointments.map((appointment) => ({
        id: appointment.id,
        status: appointment.status,
        startTime: appointment.startTime,
        endTime: appointment.endTime,
        fees: appointment.fees,
        diseases: appointment.diseases,
        patientName: appointment.patient.userName,
        patientId: appointment.patientId,
      }));

      res.status(200).json(doctorAppointments);
    } else {
      res.status(403).json({
        error: "Permission denied. Only Doctors can view appointments.",
      });
    }
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = getAppointment;

// AppontMent Table UserId => Appointment => Doctor join

// [{
//     appointmentName: 'abc',
//     user: {
//         userName: ''
//     }
// }]

// UserTable => UserTable => Appointment Join => Result

// [{
//     userName: 'abc',
//     userType: 'Doctor',
//     doctorAppointments: [{
//         appointmentName: 'abc',
//         startTime: '2015'
//     }]
// }]
