const models = require("../models");

async function updateAppointment(req, res) {
  try {
    const { id, userType } = req.user;

    if (userType === "Doctor") {
      const { appointmentId, status } = req.body;

      const appointmentToUpdate = await models.appointments.findOne({
        where: { id: appointmentId, doctorId: id },
      });

      if (!appointmentToUpdate) {
        return res.status(404).json({ error: "Appointment not found" });
      }

      if (appointmentToUpdate.status === "Approved") {
        return res.status(400).json({
          error: "Cannot update appointment. Status is already 'Approved'.",
        });
      }

      if (status === "Approved") {
        const doctorCharge = await models.drInfos.findOne({
          where: { userId: id },
        });

        if (!doctorCharge) {
          return res.status(500).json({ error: "Doctor charge not found" });
        }

        const timeDifferenceInMinutes =
          (appointmentToUpdate.endTime - appointmentToUpdate.startTime) /
          (1000 * 60);

        const feeMultiplier = Math.ceil(timeDifferenceInMinutes / 30);
        appointmentToUpdate.fees = doctorCharge.charge * feeMultiplier;
      }
      console.log(appointmentToUpdate.endTime, appointmentToUpdate.startTime);
      console.log(
        typeof appointmentToUpdate.endTime,
        appointmentToUpdate.startTime
      );
      appointmentToUpdate.status = status;
      await appointmentToUpdate.save();

      const updatedAppointments = await models.appointments.findAll({
        where: { doctorId: id },
      });

      res.status(200).json(updatedAppointments);
    } else {
      res.status(403).json({
        error: "Permission denied. Only Doctors can update appointments.",
      });
    }
  } catch (error) {
    console.error("Error updating appointment:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = updateAppointment;
