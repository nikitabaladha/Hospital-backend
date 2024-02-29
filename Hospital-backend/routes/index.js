const Controller = require("../controllers");
const Middleware = require("../middleware");
module.exports = (app) => {
  app.post("/api/signup", Controller.signup);
  app.post("/api/login", Controller.login);
  app.post("/api/drinfo", Middleware, Controller.drInfo);
  app.post("/api/doctorform", Middleware, Controller.doctorform);
  app.post("/api/availability", Middleware, Controller.availability);
  app.get("/api/get-list", Middleware, Controller.getList);
  app.post("/api/book-appointment", Middleware, Controller.bookAppointment);
  app.get("/api/get-appointment", Middleware, Controller.getAppointment);
  app.put("/api/update-appointment", Middleware, Controller.updateAppointment);
  app.delete(
    "/api/delete-appointment",
    Middleware,
    Controller.deleteAppointment
  );
};
