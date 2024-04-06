// controllers/appointment/create.js

const { Sequelize } = require("sequelize");
const moment = require("moment");
const models = require("../../models");

async function create(req, res) {
  try {
    const { userId, userType } = req.user;

    if (userType !== "Patient") {
      return res.status(403).json({
        hasError: true,
        message: "Permission denied. Only Patients can book appointments.",
      });
    }

    const { doctorId, startTime, endTime, disease } = req.body;

    const currentDateTime = moment();
    if (moment(startTime).isSameOrBefore(currentDateTime)) {
      return res.status(400).json({
        hasError: true,
        message: "Invalid appointment time. Please choose a future time.",
      });
    }

    const doctor = await models.users.findOne({
      where: { id: doctorId, userType: "Doctor" },
    });

    if (!doctor) {
      return res
        .status(404)
        .json({ hasError: true, message: "Doctor not found." });
    }

    const startDay = moment(startTime).format("dddd");

    const startDateTimeFormatted = moment(startTime).format(
      "YYYY-MM-DD HH:mm:ss"
    );
    const endDateTimeFormatted = moment(endTime).format("YYYY-MM-DD HH:mm:ss");

    const duration = moment.duration(moment(endTime).diff(moment(startTime)));
    const durationMinutes = duration.asMinutes();

    if (durationMinutes < 30 || durationMinutes > 120) {
      return res.status(400).json({
        hasError: true,
        message:
          "Invalid appointment duration. It should be between 30 minutes and 2 hours.",
      });
    }

    const isDoctorAvailable = await models.availabilities.findOne({
      where: {
        userId: doctorId,
        day: startDay,
        startTime: { [Sequelize.Op.lte]: startDateTimeFormatted },
        endTime: { [Sequelize.Op.gte]: endDateTimeFormatted },
      },
    });

    if (!isDoctorAvailable) {
      return res.status(400).json({
        hasError: true,
        message: "Doctor is not available on the specified day or time.",
      });
    }

    const existingAppointment = await models.appointments.findOne({
      where: {
        doctorId,
        startTime: { [Sequelize.Op.lt]: new Date(endTime) },
        endTime: { [Sequelize.Op.gt]: new Date(startTime) },
        status: {
          [Sequelize.Op.or]: ["Pending", "Approved"],
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
      patientId: userId,
      disease,
      startTime,
      endTime,
      status: "Pending",
      fees: 0,
    });

    return res.status(201).json({
      hasError: false,
      message: "Appointment booked successfully",
      data: newAppointment,
    });
  } catch (error) {
    console.error("Error booking appointment:", error);

    return res
      .status(500)
      .json({ hasError: true, message: "Internal Server Error" });
  }
}

module.exports = create;
