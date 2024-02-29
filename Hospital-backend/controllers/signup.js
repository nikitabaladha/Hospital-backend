//controllers/signup.js

const models = require("../models");
const bcrypt = require("bcrypt");

async function signup(req, res) {
  const { userName, userType, email, password } = req.body;

  try {
    if (!userName)
      return res.status(400).json({ message: "Please provide user name" });

    if (!email)
      return res.status(400).json({ message: "Please provide email" });

    if (!userType)
      return res.status(400).json({ message: "Please provide user role" });

    if (!password)
      return res.status(400).json({ message: "Please provide  user password" });

    const emailExist = await models.users.findOne({
      where: { email },
      attributes: ["email"],
      raw: true,
    });

    if (emailExist) {
      return res.status(400).json({ message: "This user already exists!" });
    }

    const hashedPassword = await bcrypt.hash(password, 5);

    await models.users.create({
      userName,
      userType,
      email,
      password: hashedPassword,
    });

    return res
      .status(200)
      .json({ hasError: false, success: true, message: "Signup successful!" });
  } catch (error) {
    console.log(error);
    console.error({
      message: "Error during signup:",
      errorMessage: error.message,
    });
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = signup;
