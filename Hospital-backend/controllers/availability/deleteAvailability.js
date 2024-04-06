// controllers/availability/deleteAvailability.js

const models = require("../../models");

async function deleteAvailability(req, res) {
  try {
    const { userId, userType } = req.user;

    if (userType !== "Doctor") {
      return res.status(403).json({
        hasError: true,
        message: "Only doctors are allowed to delete availability.",
      });
    }

    const { availabilityId } = req.params;

    const availability = await models.availabilities.findOne({
      where: { id: availabilityId, userId },
    });

    if (!availability) {
      return res.status(404).json({
        hasError: true,
        message:
          "Availability not found or you don't have permission to delete it",
      });
    }

    await availability.destroy();

    return res.status(200).json({
      hasError: false,
      message: "Availability deleted successfully",
    });
  } catch (error) {
    console.error("Error during deleting availability data:", error);

    return res
      .status(500)
      .json({ hasError: true, message: "Internal Server Error" });
  }
}

module.exports = deleteAvailability;
