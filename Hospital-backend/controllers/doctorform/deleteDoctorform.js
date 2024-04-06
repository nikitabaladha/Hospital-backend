// controllers/doctorForm/deleteDoctorForm.js

const models = require("../../models");

async function deleteDoctorForm(req, res) {
  try {
    const { userId: id, userType } = req.user;

    const { doctorFormId } = req.params;

    if (userType !== "Doctor") {
      return res.status(400).json({
        hasError: true,
        message: "Only doctors can delete doctor forms.",
      });
    }

    const doctorForm = await models.doctorforms.findOne({
      where: { id: doctorFormId, userId: id },
    });

    if (!doctorForm) {
      return res.status(404).json({
        hasError: true,
        message:
          "Doctor form not found or you are not authorized to delete this Doctor form.",
      });
    }

    await models.doctorforms.destroy({
      where: { id: doctorFormId },
    });

    return res.status(200).json({
      hasError: false,
      message: "Doctor form deleted successfully!",
    });
  } catch (error) {
    console.error("Error during deleting form:", error);

    return res
      .status(500)
      .json({ hasError: true, message: "Internal Server Error" });
  }
}

module.exports = deleteDoctorForm;
