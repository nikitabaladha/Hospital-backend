const Controller = require("../controllers");
const Middleware = require("../middleware");

module.exports = (app) => {
  app.post("/api/signup", Controller.signup);
  app.post("/api/login", Controller.login);

  app.post("/api/doctorform", Middleware, Controller.doctorform.create);
  app.get("/api/doctorform", Middleware, Controller.doctorform.get);
  app.put("/api/doctorform", Middleware, Controller.doctorform.update);
  app.delete(
    "/api/doctorform",
    Middleware,
    Controller.doctorform.deleteDoctorform
  );

  app.post("/api/availability", Middleware, Controller.availability.create);
  app.get("/api/availability", Middleware, Controller.availability.get);
  app.put("/api/availability", Middleware, Controller.availability.update);
  app.delete(
    "/api/availability",
    Middleware,
    Controller.availability.deleteAvailability
  );

  app.post("/api/appointment", Middleware, Controller.appointment.create);
  app.get("/api/appointment", Middleware, Controller.appointment.get);
  app.put("/api/appointment", Middleware, Controller.appointment.update);
  app.delete(
    "/api/appointment",
    Middleware,
    Controller.appointment.deleteAppointment
  );
};
