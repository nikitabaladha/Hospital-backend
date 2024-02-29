const models = require("../models");

async function drInfo(req, res) {
  try {
    const { userId, charge } = req.body;

    const user = await models.users.findOne({ where: { id: userId } });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await models.drInfos.create({
      userId: user.id,
      charge,
    });

    res.status(201).json({ message: "DrInfo created successfully" });
  } catch (error) {
    console.error("Error creating DrInfo:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = drInfo;
