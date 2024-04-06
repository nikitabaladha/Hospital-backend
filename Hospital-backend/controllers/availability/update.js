// controllers/availability/update.js

const models = require("../../models");

async function update(req, res) {
  try {
    const { userId, userType } = req.user;

    const { availabilityId } = req.params;

    if (userType !== "Doctor") {
      return res.status(400).json({
        message: "Only doctors can update availability data.",
        hasError: true,
      });
    }

    const { day, startTime, endTime } = req.body;

    const availability = await models.availabilities.findOne({
      where: { id: availabilityId, userId },
    });

    if (!availability) {
      return res.status(404).json({
        hasError: true,
        message:
          "Availability not found or you don't have permission to update it",
      });
    }

    await availability.update({
      day,
      startTime,
      endTime,
    });

    return res.status(200).json({
      message: "Availability updated successfully",
      data: availability,
    });
  } catch (error) {
    console.error("Error during updating availability", error);

    return res
      .status(500)
      .json({ hasError: true, message: "Internal Server Error" });
  }
}

module.exports = update;
