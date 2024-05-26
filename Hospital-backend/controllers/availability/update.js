// controllers/availability/update.js

const models = require("../../models");
const validateAvailability = require("../../validator/validateAvailability");

async function update(req, res) {
  try {
    const { userId, userType } = req.user;
    const { id, day, startTime, endTime } = req.body;

    if (userType !== "Doctor") {
      return res.status(403).json({
        hasError: true,
        message: "Only Doctors are allowed to update availability.",
      });
    }

    const validationErrors = validateAvailability(day, startTime, endTime);
    if (validationErrors.length > 0) {
      return res.status(400).json({
        hasError: true,
        message: validationErrors.join(", "),
      });
    }

    const user = await models.users.findOne({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({
        hasError: true,
        message: "User not found",
      });
    }

    if (user.status !== "Approved") {
      return res.status(403).json({
        hasError: true,
        message: "Only approved doctors can update availability.",
      });
    }

    const availability = await models.availabilities.findOne({
      where: { id, userId },
    });

    if (!availability) {
      return res.status(404).json({
        hasError: true,
        message: "Availability not found",
      });
    }

    availability.day = day;
    availability.startTime = startTime;
    availability.endTime = endTime;

    await availability.save();

    return res.status(200).json({
      hasError: false,
      message: "Availability data updated successfully",
      data: availability,
    });
  } catch (error) {
    console.error("Error during updating availability", error);

    return res.status(500).json({
      hasError: true,
      message: "Internal Server Error",
    });
  }
}

module.exports = update;
