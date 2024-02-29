const models = require("../models");
const moment = require("moment");

async function bookAppointment(req, res) {
  try {
    const { id, userType } = req.user;

    if (userType !== "Patient") {
      return res.status(403).json({
        error: "Permission denied. Only Patients can book appointments.",
      });
    }

    const { doctorId, startTime, endTime } = req.body;

    const currentDateTime = moment();
    if (moment(startTime).isSameOrBefore(currentDateTime)) {
      return res.status(400).json({
        error: "Invalid appointment time. Please choose a future time.",
      });
    }

    const doctor = await models.users.findOne({
      where: { id: doctorId, userType: "Doctor" },
    });

    if (!doctor) {
      return res.status(404).json({ error: "Doctor not found." });
    }

    const startDay = moment(startTime).format("dddd");

    const startDateTime = moment(startTime).toDate();
    const endDateTime = moment(endTime).toDate();

    const duration = moment.duration(endDateTime - startDateTime);
    const durationMinutes = duration.asMinutes();

    if (durationMinutes < 30 || durationMinutes > 120) {
      return res.status(400).json({
        error:
          "Invalid appointment duration. It should be between 30 minutes and 2 hours.",
      });
    }

    const isDoctorAvailable = await models.availabilities.findOne({
      where: {
        userId: doctorId,
        day: startDay,
        startTime: { [models.Sequelize.Op.lte]: startDateTime },
        endTime: { [models.Sequelize.Op.gte]: endDateTime },
      },
    });

    if (!isDoctorAvailable) {
      return res.status(400).json({
        error: `Doctor is not available on the specified day or time.`,
      });
    }

    const existingAppointment = await models.appointments.findOne({
      where: {
        doctorId,
        startTime: { [models.Sequelize.Op.lt]: new Date(endTime) },
        endTime: { [models.Sequelize.Op.gt]: new Date(startTime) },
        status: {
          [models.Sequelize.Op.or]: ["Pending", "Approved"],
        },
      },
    });

    if (existingAppointment) {
      return res.status(400).json({
        error: `Doctor already has an approved appointment in the specified time slot.`,
      });
    }

    const newAppointment = await models.appointments.create({
      doctorId,
      patientId: id,
      disease: req.body.disease,
      startTime,
      endTime,
      status: "Pending",
      fees: 0,
    });

    console.log("Appointment booked successfully:", newAppointment);

    res.status(201).json({
      message: "Appointment booked successfully",
      appointment: newAppointment,
    });
  } catch (error) {
    console.error("Error booking appointment:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = bookAppointment;
