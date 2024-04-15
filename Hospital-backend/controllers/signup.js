//controllers/signup.js

const models = require("../models");
const saltFunction = require("../validator/saltFunction.js");

async function signup(req, res) {
  try {
    const { userName, userType, email, password } = req.body;

    if (!userName)
      return res.status(400).json({ message: "Please provide user name" });

    if (!email)
      return res.status(400).json({ message: "Please provide email" });

    if (!userType)
      return res.status(400).json({ message: "Please provide user role" });

    if (!password)
      return res.status(400).json({ message: "Please provide user password" });

    const existingUser = await models.users.findOne({ where: { email } });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }

    const { hashedPassword, salt } = saltFunction.hashPassword(password);

    const newUser = await models.users.create({
      userName,
      userType,
      email,
      password: hashedPassword,
      salt,
    });

    return res.status(200).json({
      hasError: false,
      message: "User created successfully",
      data: newUser,
    });
  } catch (error) {
    console.error("Error during signing up:", error);

    return res.status(500).json({
      hasError: true,
      message: "Internal server error",
      error: error.message,
    });
  }
}

module.exports = signup;
