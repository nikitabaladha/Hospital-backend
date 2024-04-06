// controllers/availability/create.js

const models = require("../../models");

async function create(req, res) {
  try {
    const { userId, userType } = req.user;

    const { day, startTime, endTime } = req.body;

    if (userType !== "Doctor") {
      return res.status(403).json({
        hasError: true,
        message: "Only Doctors are allowed to create availability.",
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

    let newAvailability = await models.availabilities.create({
      userId,
      day,
      startTime,
      endTime,
    });

    return res.status(201).json({
      hasError: false,
      message: "Availability data created successfully",
      data: newAvailability,
    });
  } catch (error) {
    console.error("Error during creating availability", error);

    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(400).json({
        hasError: true,
        message:
          "An availability with the same day by same user already exists",
      });
    }

    return res
      .status(500)
      .json({ hasError: true, message: "Internal Server Error" });
  }
}

module.exports = create;
