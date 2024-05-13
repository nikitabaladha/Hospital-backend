const Controller = require("../controllers");
const Middleware = require("../middleware");

module.exports = (app) => {
  app.post("/api/signup", Controller.signup);
  app.post("/api/login", Controller.login);

  app.post("/api/doctorForm", Middleware, Controller.doctorForm.create);
  app.get("/api/doctorForm", Controller.doctorForm.get);
  app.get("/api/doctorForm/:doctorId", Middleware, Controller.doctorForm.get);
  app.put(
    "/api/doctorForm/:doctorFormId",
    Middleware,
    Controller.doctorForm.update
  );
  app.delete(
    "/api/doctorForm/:doctorFormId",
    Middleware,
    Controller.doctorForm.deleteDoctorForm
  );

  app.post("/api/availability", Middleware, Controller.availability.create);
  app.get(
    "/api/availability/:doctorId",
    Middleware,
    Controller.availability.get
  );
  app.put(
    "/api/availability/:availabilityId",
    Middleware,
    Controller.availability.update
  );
  app.delete(
    "/api/availability/:availabilityId",
    Middleware,
    Controller.availability.deleteAvailability
  );

  app.post("/api/appointment", Middleware, Controller.appointment.create);
  app.get("/api/appointment", Middleware, Controller.appointment.get);
  app.put(
    "/api/appointment/:appointmentId",
    Middleware,
    Controller.appointment.update
  );
  app.delete(
    "/api/appointment",
    Middleware,
    Controller.appointment.deleteAppointment
  );
};
