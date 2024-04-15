// controllers/login.js

const jwt = require("jsonwebtoken");
const models = require("../models");
const saltFunction = require("../validator/saltFunction");
const config = require("../config/config.js");

async function login(req, res) {
  try {
    const { email, password } = req.body;

    const user = await models.users.findOne({
      where: { email },
      raw: true,
    });

    if (!user) {
      return res.status(404).json({
        hasError: true,
        message: "Sorry, this user does not exist!",
      });
    }

    const isPasswordValid = await saltFunction.validatePassword(
      password,
      user.password,
      user.salt
    );

    if (!isPasswordValid) {
      return res.status(401).json({
        hasError: true,
        message: "Invalid password",
      });
    }

    const accessToken = jwt.sign(
      {
        userId: user.id,
        userName: user.userName,
        email: user.email,
        userType: user.userType,
      },
      config.jwtSecret,
      {
        expiresIn: config.jwtExpiration,
      }
    );

    return res.status(200).json({
      accessToken,
      userDetails: user,
      hasError: false,
      message: "Login successful",
    });
  } catch (error) {
    console.error("Error during login:", error);

    return res.status(500).json({
      hasError: true,
      message: "Internal server error",
      error: error.message,
    });
  }
}

module.exports = login;
