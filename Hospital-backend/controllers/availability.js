const models = require("../models");

async function availability(req, res) {
  try {
    const { id, userType } = req.user;
    const { userId, day, startTime, endTime } = req.body;

    if (userType !== "Doctor") {
      return res.status(403).json({
        error:
          "Only Doctors are allowed to update availability.",
      });
    }

    const user = await models.users.findOne({
      where: { id: userId },
      raw: true,
    });

    if (!user) {
      return res.status(400).json({
        error: "Invalid userId",
      });
    }

    await models.availabilities.create({
      userId,
      day,
      startTime,
      endTime,
    });

    res.status(201).json({ message: "Availability data created successfully" });
  } catch (error) {
    console.error("Error creating availability data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = availability;
