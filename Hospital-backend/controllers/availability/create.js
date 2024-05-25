// // controllers/availability/create.js

// const models = require("../../models");

// async function create(req, res) {
//   try {
//     const { userId, userType } = req.user;

//     const { day, startTime, endTime } = req.body;

//     if (userType !== "Doctor") {
//       return res.status(403).json({
//         hasError: true,
//         message: "Only Doctors are allowed to create availability.",
//       });
//     }

//     const user = await models.users.findOne({
//       where: { id: userId },
//     });

//     if (!user) {
//       return res.status(404).json({
//         hasError: true,
//         message: "User not found",
//       });
//     }

//     if (user.status !== "Approved") {
//       return res.status(403).json({
//         hasError: true,
//         message: "Only approved doctors can create availability.",
//       });
//     }

//     const start = new Date(startTime);
//     const end = new Date(endTime);

//     if (start >= end) {
//       return res.status(400).json({
//         hasError: true,
//         message: "End time must be greater than start time",
//       });
//     }

//     const timeDifference = (end - start) / (1000 * 60 * 60);
//     if (timeDifference < 3) {
//       return res.status(400).json({
//         hasError: true,
//         message: "End time must be at least 3 hours after start time",
//       });
//     }

//     let newAvailability = await models.availabilities.create({
//       userId,
//       day,
//       startTime,
//       endTime,
//     });

//     return res.status(200).json({
//       hasError: false,
//       message: "Availability data created successfully",
//       data: newAvailability,
//     });
//   } catch (error) {
//     console.error("Error during creating availability", error);

//     if (error.name === "SequelizeUniqueConstraintError") {
//       return res.status(400).json({
//         hasError: true,
//         message:
//           "An availability with the same day by same user already exists",
//       });
//     }

//     return res
//       .status(500)
//       .json({ hasError: true, message: "Internal Server Error" });
//   }
// }

// module.exports = create;

const models = require("../../models");

async function create(req, res) {
  try {
    const { userId, userType } = req.user;
    const { day, startTime, endTime } = req.body;

    // Check if user is a Doctor
    if (userType !== "Doctor") {
      return res.status(403).json({
        hasError: true,
        message: "Only Doctors are allowed to create availability.",
      });
    }

    // Check if required fields are provided
    if (!day) {
      return res.status(400).json({
        hasError: true,
        message: "Day is required.",
      });
    }
    if (!startTime) {
      return res.status(400).json({
        hasError: true,
        message: "Start time is required.",
      });
    }
    if (!endTime) {
      return res.status(400).json({
        hasError: true,
        message: "End time is required.",
      });
    }

    // Validate user existence
    const user = await models.users.findOne({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({
        hasError: true,
        message: "User not found",
      });
    }

    // Check if the user is approved
    if (user.status !== "Approved") {
      return res.status(403).json({
        hasError: true,
        message: "Only approved doctors can create availability.",
      });
    }

    // Parse startTime and endTime
    const parseTime = (timeString) => {
      const [hours, minutes, seconds] = timeString.split(":").map(Number);
      const date = new Date();
      date.setHours(hours, minutes, seconds, 0);
      return date;
    };

    const start = parseTime(startTime);
    const end = parseTime(endTime);

    // Validate start and end times
    if (start >= end) {
      return res.status(400).json({
        hasError: true,
        message: "End time must be greater than start time",
      });
    }

    // Ensure the time difference is at least 3 hours
    const timeDifference = (end - start) / (1000 * 60 * 60);
    if (timeDifference < 3) {
      return res.status(400).json({
        hasError: true,
        message: "End time must be at least 3 hours after start time",
      });
    }

    // Create new availability entry
    let newAvailability = await models.availabilities.create({
      userId,
      day,
      startTime,
      endTime,
    });

    return res.status(200).json({
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

    return res.status(500).json({
      hasError: true,
      message: "Internal Server Error",
    });
  }
}

module.exports = create;
