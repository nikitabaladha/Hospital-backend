// validator/validateAvailability.js

const validateAvailability = (day, startTime, endTime) => {
  const errors = [];

  if (!day) {
    errors.push("Day is required.");
  }

  if (!startTime) {
    errors.push("Start time is required.");
  }

  if (!endTime) {
    errors.push("End time is required.");
  }

  if (startTime && endTime) {
    const parseTime = (timeString) => {
      const [hours, minutes, seconds] = timeString.split(":").map(Number);
      const date = new Date();
      date.setHours(hours, minutes, seconds, 0);
      return date;
    };

    const start = parseTime(startTime);
    const end = parseTime(endTime);

    if (start >= end) {
      errors.push("End time must be greater than start time.");
    }

    const timeDifference = (end - start) / (1000 * 60 * 60);
    if (timeDifference < 3) {
      errors.push("End time must be at least 3 hours after start time.");
    }
  }

  return errors;
};

module.exports = validateAvailability;
