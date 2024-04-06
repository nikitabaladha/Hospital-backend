// controllers/appointment/update.js

const models = require("../../models");

async function update(req, res) {
  let dbTransactions;

  try {
    const { userId, userType } = req.user;

    if (userType !== "Doctor") {
      return res.status(400).json({
        message: "Only doctors can update appointment data.",
        hasError: true,
      });
    }

    const { appointmentId } = req.params;

    const { status } = req.body;

    const appointment = await models.appointments.findOne({
      where: { id: appointmentId, doctorId: userId },
    });

    if (!appointment) {
      return res.status(404).json({
        hasError: true,
        message: "Appointment not found",
      });
    }

    if (appointment.status !== "Pending") {
      return res.status(400).json({
        hasError: true,
        message: "Cannot update appointment. Status is already 'Approved'.",
      });
    }

    if (status === "Approved") {
      const doctorInfo = await models.doctorforms.findOne({
        where: { userId },
      });

      if (!doctorInfo) {
        return res.status(500).json({
          hasError: true,
          message: "Doctor information not found",
        });
      }

      const doctorFees = doctorInfo.fees;

      const timeDifferenceInMinutes =
        (appointment.endTime - appointment.startTime) / (1000 * 60);

      const feeMultiplier = Math.ceil(timeDifferenceInMinutes / 30);
      const fees = doctorFees * feeMultiplier;

      dbTransactions = await models.sequelize.transaction({
        autoCommit: false,
      });

      await appointment.update(
        {
          status,
          fees,
        },
        { transaction: dbTransactions }
      );

      await dbTransactions.commit();
    } else {
      dbTransactions = await models.sequelize.transaction({
        autoCommit: false,
      });

      await appointment.update(
        {
          status,
        },
        { transaction: dbTransactions }
      );

      await dbTransactions.commit();
    }

    return res.status(200).json({
      message: "Appointment updated successfully",
      data: appointment,
    });
  } catch (error) {
    if (dbTransactions) {
      await dbTransactions.rollback();

      console.error("Transaction rolled back:", error);
    }
    console.error("Error during updating appointment:", error);

    return res.status(500).json({
      hasError: true,
      message: "Internal Server Error",
    });
  }
}

module.exports = update;
