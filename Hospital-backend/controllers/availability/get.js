const models = require("../../models");

async function get(req, res) {
  try {
    const { userId } = req.user;

    const { doctorId } = req.params;

    if (!doctorId) {
      return res.status(400).json({
        hasError: true,
        message: "doctorId is required",
      });
    }

    const availabilities = await models.availabilities.findAll({
      where: { userId: doctorId },
    });

    if (!availabilities || availabilities.length === 0) {
      return res.status(404).json({
        hasError: true,
        message: "No availability data found of this Doctor",
      });
    }

    return res.status(200).json({
      hasError: false,
      message: "Availability data retrieved successfully",
      data: availabilities,
    });
  } catch (error) {
    console.error("Error during retrieving availability data:", error);

    return res
      .status(500)
      .json({ hasError: true, message: "Internal Server Error" });
  }
}

module.exports = get;
