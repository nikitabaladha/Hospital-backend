const signup = require("./signup");
const login = require("./login");
const drInfo = require("./drinfo");
const doctorform = require("./doctorform");
const availability = require("./availability");
const getList = require("./get-list");
const bookAppointment = require("./book-appointment");
const getAppointment = require("./get-appointment");
const updateAppointment = require("./update-appointment");

const deleteAppointment = require("./delete-appointment");
module.exports = {
  signup,
  login,
  availability,
  doctorform,
  getList,
  bookAppointment,
  getAppointment,
  updateAppointment,
  deleteAppointment,
  drInfo,
};
