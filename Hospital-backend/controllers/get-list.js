const models = require("../models");

async function getList(req, res) {
  try {
    const { id, userType } = req.user;

    if (userType === "Patient") {
      const availableDoctors = await models.availabilities.findAll({
        include: [
          {
            model: models.users,
            where: { userType: "Doctor" },
            attributes: ["id", "userName"],
          },
        ],
      });

      const doctorCharges = await models.drInfos.findAll({
        include: [
          {
            model: models.users,
            where: { userType: "Doctor" },
            attributes: ["id"],
          },
        ],
      });

      const availableDoctorsWithCharges = availableDoctors.map((doctor) => {
        const chargeInfo = doctorCharges.find(
          (charge) => charge.user.id === doctor.user.id
        );

        return {
          userId: doctor.user.id,
          name: doctor.user.userName,
          day: doctor.day,
          startTime: doctor.startTime,
          endTime: doctor.endTime,
          charge: chargeInfo?.charge || null,
        };
      });

      res.status(200).json(availableDoctorsWithCharges);
    } else {
      res.status(403).json({
        error: "Permission denied. Only Patients can view available doctors.",
      });
    }
  } catch (error) {
    console.error("Error fetching available doctors:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = getList;
