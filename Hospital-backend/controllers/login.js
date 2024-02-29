const models = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function login(req, res) {
  const { email, password } = req.body;

  try {
    const userExists = await models.users.findOne({
      where: { email },
      attributes: ["email", "password", "id", "userType", "userName"],
      raw: true,
    });

    if (!userExists) {
      return res.status(400).json({
        message: "Sorry, this user does not exist!",
        type: "user_not_found",
      });
    }

    const passwordMatch = await bcrypt.compare(password, userExists.password);

    if (!passwordMatch) {
      return res.status(400).json({
        message: "Password does not match!",
        type: "password_mismatch",
      });
    }

    const accessToken = jwt.sign(
      {
        id: userExists.id,
        email: userExists.email,
        userType: userExists.userType,
      },
      "12345",
      { expiresIn: "24h" }
    );
    return res.status(200).json({
      data: {
        accessToken,
        email: userExists.email,
        userType: userExists.userType,
        userName: userExists.userName,
      },
      hasError: false,
    });
  } catch (error) {
    console.log(error);
    console.error("Error during login:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = login;
